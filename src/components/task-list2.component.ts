import * as ko from 'knockout';
import { ITask } from '../models/task.model';
import { apiRequest } from '../api/api.service';
import templateString from './task-list2.template.html';

const mockArtworks = [
    'Blue Interior',
    'Garden in Spring',
    'Study of a Figure',
    'Still Life with Fruit',
    'The Red Studio',
    'River at Dusk',
    'Portrait in Green',
    'Vase with Wildflowers',
    'Harbor in the Morning',
    'Composition in Gold',
    'Mountain Path',
    'Winter Orchard',
].map((title, index) => ({
    id: 1001 + index,
    title: `Mock artwork: ${title}`,
    image_id: null,
    thumbnail: null,
    api_link: `/mock/artworks/${1001 + index}`,
}));

const mockPageSize = 4;

class TaskList2ViewModel {
    // 💡 Use the explicit, underlying types exported by the Knockout typings package
    public tasks: KnockoutObservableArray<ITask>;
    public newTaskTitle: KnockoutObservable<string>;
    public response: KnockoutObservable<any>;
    public currentPage: KnockoutObservable<number>;
    public pagination: KnockoutObservable<{}>;
    public totalPages: KnockoutObservable<number>;
    public isLoading: KnockoutObservable<boolean>;
    public error: KnockoutObservable<any>;

    constructor() {
        this.tasks = ko.observableArray<ITask>([]);
        this.newTaskTitle = ko.observable<string>('');
        //this.loadTasks();

        this.response = ko.observable({});
        this.currentPage = ko.observable(0);
        this.totalPages = ko.observable(0);
        this.pagination = ko.observable({});

        this.isLoading = ko.observable(false);
        this.error = ko.observable(null);
        // this.fetchData = async (url = '') => {
        //     this.isLoading(true);
        //     this.error('');
        // };
    }

    public async fetchData(pageValue: string | number = 1): Promise<void> {
        this.isLoading(true);
        this.error('');
        try {
            const totalPages = Math.ceil(mockArtworks.length / mockPageSize);
            const requestedPage = Number(pageValue) || 1;
            const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);
            const offset = (currentPage - 1) * mockPageSize;

            this.response({
                data: mockArtworks.slice(offset, offset + mockPageSize),
            });
            this.pagination({
                current_page: currentPage,
                total_pages: totalPages,
                total: mockArtworks.length,
                limit: mockPageSize,
                offset,
                prev_url: currentPage > 1 ? String(currentPage - 1) : null,
                next_url: currentPage < totalPages ? String(currentPage + 1) : null,
            });
        } catch (err) {
            this.error(err instanceof Error ? err.message : String(err));
        } finally {
            this.isLoading(false);
        }
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

    public async fetchData2(url: string = ''): Promise<void> {
            this.isLoading(true);
            this.error('');
            const _url = url || 'https://api.artic.edu/api/v1/artworks'; // Default URL
            try {
                // Simulate an asynchronous API call using fetch
                const response = await fetch(_url);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const result = await response.json();
                // console.log(result);
                this.response(result); // Update the observable array with the fetched data
                // Extract pagination data from the response and update observables accordingly
                if (result.pagination) {
                    this.pagination(result.pagination);
                }
            } catch (err: any) {
                this.error(err.message);
            } finally {
                this.isLoading(false);
            }
    }
}

// Global tag component registration block
ko.components.register('task-list2', {
    viewModel: TaskList2ViewModel,
    template: templateString
});
