import * as ko from 'knockout';
import { ITask } from '../models/task.model';
import { apiRequest } from '../api/api.service';
import templateString from './task-list.template.html';

class TaskListViewModel {
    // 💡 Use the explicit, underlying types exported by the Knockout typings package
    public tasks: KnockoutObservableArray<ITask>;
    public newTaskTitle: KnockoutObservable<string>;

    constructor() {
        this.tasks = ko.observableArray<ITask>([]);
        this.newTaskTitle = ko.observable<string>('');
        this.loadTasks();
    }

    public async loadTasks(): Promise<void> {
        try {
            const data = await apiRequest<ITask[]>('/tasks');
            this.tasks(data);
        } catch (error) {
            console.error('Failed to load tasks', error);
        }
    }

    public async addTask(): Promise<void> {
        const titleText = this.newTaskTitle().trim();
        if (!titleText) return;

        const payload: ITask = { title: titleText, completed: false };

        try {
            const newTask = await apiRequest<ITask>('/tasks', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            this.tasks.push(newTask);
            this.newTaskTitle(''); // Clear inputs safely
        } catch (error) {
            console.error('Failed to add task', error);
        }
    }
}

// Global tag component registration block
ko.components.register('task-list', {
    viewModel: TaskListViewModel,
    template: templateString
});
