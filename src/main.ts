import * as ko from 'knockout';
import './components/task-list.component'; // Forces code registration execution

class RootAppViewModel {
    public message = ko.observable<string>("App Bootstrapped Successfully");
}

ko.applyBindings(new RootAppViewModel());
