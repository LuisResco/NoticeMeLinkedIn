class F {
    constructor(){
        this._classesToSearch = [
            {c: "invitation-card__action-btn artdeco-button artdeco-button--2 artdeco-button--secondary ember-view", attr: []},
            {c: "full-width artdeco-button artdeco-button--2 artdeco-button--full artdeco-button--secondary ember-view", attr: [{"key": "data-control-name", "value": "invite"}]},
            {c: "full-width artdeco-button artdeco-button--2 artdeco-button--full artdeco-button--secondary ember-view", attr: [{"key": "data-control-name", "value": "people-connect"}]},
            {c: "full-width artdeco-button artdeco-button--2 artdeco-button--full artdeco-button--secondary ember-view", attr: [{"key": "data-control-name", "value": "connection_connections_connect"}]},
        ];
        this._elements = [];
        this.INTERVAL_MILLISECCONDS = 30 * 1000;
    }
    Start(){
        this.intervalId = window.setInterval(
            () => { this.Iterate.call(this) },
            this.INTERVAL_MILLISECCONDS
        );
    }
    ScrollDown() {
        window.scrollTo(0, document.body.scrollHeight);
    }
    Iterate(){
        let element = this._elements[0];
        if(element == null){
            this.GetElements();
            element = this._elements[0];
            if(element == null){
                console.log("Finished");
                return;
            }
        }
        element.click();
        this._elements.shift();
        console.log("Remaining " + this._elements.length);
    }
    GetElements(){
        this.ScrollDown();
        for (const c of this._classesToSearch) {
            const elements = document.getElementsByClassName(c.c);
            for (const e of elements) {
                if(c.attr.length == 0){
                    this._elements.push(e);
                }else{
                    let isValid = true;
                    for (const attr of c.attr) {
                        if(e.getAttribute(attr.key) != attr.value){
                            isValid = false; 
                        }
                    }
                    if(isValid){
                        this._elements.push(e);
                    }
                }
            }
        }
    }
}

const f = new F();
f.Start();