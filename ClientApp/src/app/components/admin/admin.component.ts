
import { Component} from '@angular/core';

@Component({
    template: `<h1>Admin</h1>
    <chart type="pie" [data]="data"></chart>

    `
})

export class AdminComponent{
    data = {
        labels: ['BWM', 'Audi', 'Mazda'],
        datasets: [
            {
                data: [5, 3, 1],
                backgroundColor: [
                    "#ff6384",
                    "#36a2eb",
                    "#ffce56"
                ]
            }
        ]
    };
}