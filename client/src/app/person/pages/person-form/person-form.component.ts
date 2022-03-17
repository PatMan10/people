import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Person } from 'src/app/person/person.model';
import { PersonService } from 'src/app/person/person.service';
import { UiUrls } from 'src/app/common/utils/urls';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
})
export class PersonFormComponent implements OnInit {
  id: string | null = null;
  person = new Person();
  title = 'Add Person';
  btnText = 'Add';

  constructor(
    private peopleService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
      this.peopleService.getById(id).subscribe((p) => {
        this.person = p;
      });
      this.title = 'Edit Character';
      this.btnText = 'Save';
    }
  }

  submit(e: NgForm) {
    if (e.valid === false) return;

    const operation$: Observable<Person> = this.id
      ? this.peopleService.update(this.person)
      : this.peopleService.add(this.person);

    operation$.subscribe(() => {
      this.router.navigate([UiUrls.people.VIEW_ALL]);
    });
  }
}
