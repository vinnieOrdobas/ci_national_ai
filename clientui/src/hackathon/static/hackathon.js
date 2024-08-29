
class Alerts {
    constructor() {
        this.messages = [];
    }

    error(text) {
        this.messages.push(text);
        setTimeout(() => {this.remove(text)}, 3000);
    }

    remove(text) {
        this.messages.splice(this.messages.indexOf(text), 1);
        turtlegui.reload();
    }

    has_message() {
        return this.messages.length > 0;
    }
}

var alerts = new Alerts();


class HackathonUI {
    constructor() {
        this.tab = 'info';
        this.history = [{
            from: "bot",
            text: "Hallo! Can I help you with your inquiry?"
        }];
        this.current_prompt = null;
        this.loading = false;
    }

    set_tab(tab_id) {
        this.tab = tab_id;
        turtlegui.reload();
    }

    has_prompt() {
        return this.current_prompt != null && !this.loading;
    }

    async process_prompt() {
        this.history.push({
            from: "user",
            text: this.current_prompt
        });
        this.loading = true;
        turtlegui.reload();

        var response = await this.send_prompt();

        this.history.push({
            from: "bot",
            text: response['reply']
        });
        this.loading = false;
        this.current_prompt = null;
        turtlegui.reload();
    }

    async send_prompt() {
        try {
            var response = await fetch('/clientui/api/chat', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "prompt": this.current_prompt,
                    "history": this.history
                })
            });
            var data = await response.json();
            return data;
        } catch(error) {
            console.log('Error fetching chat: ', error);
            alerts.error(error);
            return {"reply": "Apologies I experienced an error, could you restate your request?"}
        } finally {
            this.loading = false;
            turtlegui.reload();
        }
    }
}


var hackathon = new HackathonUI();


document.addEventListener("DOMContentLoaded", function(){
    console.log('loaded');
    turtlegui.reload();    
});
