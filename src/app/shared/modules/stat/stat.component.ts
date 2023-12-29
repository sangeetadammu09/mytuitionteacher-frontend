import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
    @Input() bgClass: string;
    @Input() icon: string;
    @Input() count1: number;
    @Input() label1: string;
    @Input() count2: number;
    @Input() label2: string;
    @Input() count3: number;
    @Input() label3: string;
    @Input() data: number;
    @Output() event: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnInit() {}
}
