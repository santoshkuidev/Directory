import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ContactService} from "../../services/contacts.service";
import {NgForm} from "@angular/forms";
import {Contact} from "../contact-list/contact";

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
    currentContact:any;
    @ViewChild('contactForm', { static: true }) contactForm: ElementRef;
    @Input() model;
    @Input() isEdit:boolean = false;
    @Output() cancel = new EventEmitter();
    // model = <Contact> {};
    submitted = false;
    btnName = 'Submit';

    constructor(private contactService: ContactService) {
    }

    ngOnInit(): void {
    }

    createNew() {
        return  {} as Contact;
    }

    onSubmit(contactForm: NgForm) {

        if(contactForm.valid){
            this.submitted = true;
            if(!this.isEdit){
                this.contactService.postContact(contactForm.value)
                .subscribe(contact => {
                    console.log('object saved', contact);
                    // this.model = this.createNew();
                    this.submitted = false;
                    contactForm.resetForm();
                });
            }else {
                this.contactService.putContact(contactForm.value)
                .subscribe(contact => {
                    console.log('object saved', contact);
                    // this.model = this.createNew();
                    this.submitted = false;
                    contactForm.resetForm();

                });
            }

            this.cancelEdit();
            

        console.log('submitted');
        }else{
            Object.keys( contactForm.controls).forEach(key => {
                contactForm.controls[key].markAsDirty();
               });
               return;
        }

       
    }

    get diagnostic() {
        return JSON.stringify(this.model);
    }

    cancelEdit(){
        this.cancel.emit();
    }

}
