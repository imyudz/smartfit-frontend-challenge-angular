import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetUnitsService } from 'src/app/services/get-units.service';
import { Location } from 'src/app/types/location.interface';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  results: Location[] = [];
  formGroup!: FormGroup;
  filteredResults: Location[] = [];

  constructor(private formBuilder: FormBuilder, private unitService: GetUnitsService) {

  }
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    })
    this.unitService.getAllUnits().subscribe(data => {
      this.results = data.locations
      this.filteredResults = data.locations
    });
  }

  onSubmit() {
    if (this.formGroup.value.showClosed == false) {
      this.filteredResults = this.results.filter(location => location.opened == true)
    } else {
      this.filteredResults = this.results;
    }
  }

  onClean() {
    this.formGroup.reset();
  }

}
