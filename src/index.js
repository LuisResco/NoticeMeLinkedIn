class Interactables {
    constructor() { }
    Iterate() { }
    Report() { }
    ReportLastIteration() { }
}

class ButtonsByClass extends Interactables {
    constructor(name, cssClass, context) {
        super()
        this._name = name;
        this._cssClass = cssClass;
        this._lastIterationFarmed = 0;
        this._totalFarmed = 0;
        this._context = context;
    }
    Iterate(buttonsToClickConfig) {
        const interactables = this._context.document.getElementsByClassName(this._cssClass);
        const buttonsToClick = Math.min(buttonsToClickConfig, interactables.length);
        let itemsFarmed = 0;
        for (let i = 0; i < buttonsToClick; i++) {
            const button = interactables[i];
            button.click();
            itemsFarmed++;
        }
        this._lastIterationFarmed = itemsFarmed;
        this._totalFarmed += this._lastIterationFarmed
        return itemsFarmed;
    }
    Report() {
        const redCss = "color: red; font-size:18px;";
        const blueCss = "color: blue; font-size:15px;";
        console.log(`%c${this._name}: %c${this._totalFarmed}`, blueCss, redCss);
    }
    ReportLastIteration() {
        const redCss = "color: red; font-size:12px;";
        const blueCss = "color: blue; font-size:12px;";
        console.log(`%c${this._name}: %c${this._lastIterationFarmed}`, blueCss, redCss);
    }
}

class Farmer {
    constructor(context, callback) {
        this.INTERVAL_MILLISECCONDS = 1000 * 3;
        this.PriotityInteractables = [];
        this.Interactables = [];
        this.intervalId = -1;
        this.IsVerbose = true;
        this._context = context;
        this._callback = callback;
        this._iterationNumber = 0;

        const suggestedClass = "";
        const invitationsClass = "invitation-card__action-btn artdeco-button artdeco-button--2 artdeco-button--secondary ember-view";
        const connectClass = "full-width artdeco-button artdeco-button--2 artdeco-button--full artdeco-button--secondary ember-view";

        const suggestedConnect = new ButtonsByClass("Suggested connects", suggestedClass, this._context);
        const invitations = new ButtonsByClass("Invitations", invitationsClass, this._context);
        const connects = new ButtonsByClass("Connects", connectClass, this._context);
        this.PriotityInteractables.push(suggestedConnect);
        this.Interactables.push(invitations);
        this.Interactables.push(connects);

        this.Start();
    }
    Start() {
        this.intervalId = this._context.setInterval(
            () => { this.Iterate.call(this) },
            this.INTERVAL_MILLISECCONDS
        );
        const greenCss = "color: green; font-size:18px;";
        const blueCss = "color: blue; font-size:15px;";
        const redCss = "color: red; font-size:18px;";
        console.log(`%cEngines Started interval ID is: %c${this.intervalId}`, greenCss, redCss);
        console.log(`%cUse method Stop to interrupt this madness`, blueCss);
        console.log(`%cUse method Report to get your farm status`, blueCss);
        console.log(`%cUse method Silence to mute reports`, greenCss);
        console.log(`%cUse method Verbose to turn on reports`, greenCss);
        console.log(`%cUse method Report to print complete report`, greenCss);
    }
    Stop() {
        this._context.clearInterval(this.intervalId);
        const redCss = "color: red; font-size:18px;";
        const blueCss = "color: blue; font-size:15px;";
        console.log(`%cStopped`, redCss);
        console.log(`%cUse Start method to do it again`, blueCss);
    }
    ScrollDown() {
        this._context.scrollTo(0, document.body.scrollHeight);
    }
    Iterate() {
        this._iterationNumber++;
        if (this._iterationNumber % 6 === 0) {
            this.ScrollDown();
        }
        const hasToIteratedOnPriority = this.IterateInteractables(this.PriotityInteractables);
        let hasIteratedOnNonPriority = false;
        if (!hasToIteratedOnPriority) {
            hasIteratedOnNonPriority = this.IterateInteractables(this.Interactables);
        }

        if (this.IsVerbose) {
            this.PrintReports();
        }

        if (!hasToIteratedOnPriority && !hasIteratedOnNonPriority) {
            this.Stop();
            this._callback();
        }
    }
    IterateInteractables(interactables) {
        let interactedItems = 0;
        for (let i = 0; i < interactables.length; i++) {
            const interactable = interactables[i];
            interactedItems += interactable.Iterate(1);
        }
        if (interactedItems === 0) {
            return false;
        }
        return true;
    }
    PrintReports() {
        const greenCss = "color: green; font-size:18px;";
        console.log(`%cReporting`, greenCss);
        const interactables = this.Interactables.concat(this.PriotityInteractables);
        for (let i = 0; i < interactables.length; i++) {
            const interactable = interactables[i];
            interactable.Report();
        }
    }
    PrintLastIterationResults() {
        const greenCss = "color: green; font-size:12px;";
        console.log(`%cReporting iterations`, greenCss);
        for (let i = 0; i < this.Interactables.length; i++) {
            const interactable = this.Interactables[i];
            interactable.ReportLastIteration();
        }
    }
    Verbose() {
        this.IsVerbose = true;
    }
    Silent() {
        this.IsVerbose = false;
    }
}

const farmer = new Farmer(window, () => {
    console.log("Finished");
});