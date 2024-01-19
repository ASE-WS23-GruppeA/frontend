import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewWorkoutComponent } from './new-workout.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('NewWorkoutComponent', () => {
  let component: NewWorkoutComponent;
  let fixture: ComponentFixture<NewWorkoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule], 
      declarations: [NewWorkoutComponent]
    });
    fixture = TestBed.createComponent(NewWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize variables correctly', () => {
    expect(component.workout.userID).toEqual(0);
    expect(component.selectedMuscleGroup.name).toEqual('');
    expect(component.selectedExercise).toBeNull();
    expect(component.sets.length).toEqual(0);
    expect(component.showWorkoutContainer).toBeFalsy();
    expect(component.exercises.length).toEqual(0);
  });

  it('should have a array for musclegroup that must not be empty', () => {
    expect(component.muscleGroups.length).toBeGreaterThan(0);
  });

  it('should add a set correctly', () => {
    component.addSet();
    expect(component.sets.length).toEqual(1);
    expect(component.sets[0].reps as number).toEqual(0);
    expect(component.sets[0].kilos as number).toEqual(0);
  });

  it('should delete a set correctly', () => {
    component.addSet();
    component.addSet();
    expect(component.sets.length).toEqual(2);

    component.deleteSet(0);
    expect(component.sets.length).toEqual(1);
    expect(component.sets[0].reps).toEqual(0);
    expect(component.sets[0].kilos).toEqual(0);
  });

  it('should not delete a set if index is out of range in deleteSet', () => {
     //Add a set
    component.addSet();
    //Delete non existing set
    component.deleteSet(10); 
    expect(component.sets.length).toBe(1);
  });

  it('should check if sets have null or zero or negative values correctly', () => {
    component.sets = [{ reps: 5, kilos: 10 }, { reps: null as any, kilos: 15 }, { reps: 0, kilos: -5 }];
    expect(component.setsHasNullOrZeroOrNegativeValues()).toBeTruthy();

    component.sets = [{ reps: 5, kilos: 10 }, { reps: 6, kilos: 15 }, { reps: 7, kilos: 5 }];
    expect(component.setsHasNullOrZeroOrNegativeValues()).toBeFalsy();
  });

})


