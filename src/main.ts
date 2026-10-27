import * as ko from 'knockout';
import './components/task-list.component'; 
import './components/task-list2.component'; // Forces code registration execution

class RootAppViewModel {
    public message = ko.observable<string>("App Bootstrapped Successfully");
}

ko.applyBindings(new RootAppViewModel());
