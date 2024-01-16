import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkoutComponent } from './new-workout.component';

describe('NewWorkoutComponent', () => {
  let component: NewWorkoutComponent;
  let fixture: ComponentFixture<NewWorkoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewWorkoutComponent]
    });
    fixture = TestBed.createComponent(NewWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update musclegroup when showExercises is called', () => {
    component.showExercises(0);
    expect(component.selectedMuscleGroup).toEqual(component.muscleGroups[0]);
    expect(component.selectedExercise).toBeNull();
  });
  it('should have a array for musclegroup that must not be empty', () => {
    expect(component.muscleGroups.length).toBeGreaterThan(0);
  });

  it('should add a new set when calling addSet', () => {
    component.addSet();
    expect(component.sets.length).toBe(1);
  });

  it('should delete a set when calling deleteSet', () => {
    component.addSet(); 
    component.deleteSet(0);
    expect(component.sets.length).toBe(0);
  });

  it('should not delete a set if index is out of range in deleteSet', () => {
     //Add a set
    component.addSet();
    //Delete non existing set
    component.deleteSet(10); 
    expect(component.sets.length).toBe(1);
  });

  describe('Legs musclegroup', () => {
    const legsIndex = 0;

    it('should select legs when showExercises is called with index 0', () => {
      component.showExercises(legsIndex);
      expect(component.selectedMuscleGroup).toEqual(component.muscleGroups[legsIndex]);
      expect(component.selectedExercise).toBeNull();
    });

    it('should display exercises for legs', () => {
      component.showExercises(legsIndex);
      if (component.selectedMuscleGroup) {
        expect(component.selectedMuscleGroup.exercises).toEqual(['Squats', 'Lunges']);
      } else {
        fail('selectedMuscleGroup should not be null');
      }
    });

});

describe('chest musclegroup', () => {
  const chestIndex = 1;

  it('should select chest when showExercises is called with index 1', () => {
    component.showExercises(chestIndex);
    expect(component.selectedMuscleGroup).toEqual(component.muscleGroups[chestIndex]);
    expect(component.selectedExercise).toBeNull();
  });

  it('should display exercises for chest', () => {
    component.showExercises(chestIndex);
    if (component.selectedMuscleGroup) {
      expect(component.selectedMuscleGroup.exercises).toEqual(['Push-ups', 'Bench press']);
    } else {
      fail('selectedMuscleGroup should not be null');
    }
  });

});

describe('back musclegroup', () => {
  const backIndex = 2;

  it('should select back when showExercises is called with index 2', () => {
    component.showExercises(backIndex);
    expect(component.selectedMuscleGroup).toEqual(component.muscleGroups[backIndex]);
    expect(component.selectedExercise).toBeNull();
  });

  it('should display exercises for back', () => {
    component.showExercises(backIndex);
    if (component.selectedMuscleGroup) {
      expect(component.selectedMuscleGroup.exercises).toEqual(['Pull-ups', 'Barbell rows']);
    } else {
      fail('selectedMuscleGroup should not be null');
    }
  });
});
describe('core musclegroup', () => {
  const coreIndex = 3;

  it('should select core when showExercises is called with index 3', () => {
    component.showExercises(coreIndex);
    expect(component.selectedMuscleGroup).toEqual(component.muscleGroups[coreIndex]);
    expect(component.selectedExercise).toBeNull();
  });

  it('should display exercises for core', () => {
    component.showExercises(coreIndex);
    if (component.selectedMuscleGroup) {
      expect(component.selectedMuscleGroup.exercises).toEqual(['Sit-ups', 'Plank']);
    } else {
      fail('selectedMuscleGroup should not be null');
    }
  });
});

describe('triceps musclegroup', () => {
  const tricepsIndex = 4;

  it('should select triceps when showExercises is called with index 4', () => {
    component.showExercises(tricepsIndex);
    expect(component.selectedMuscleGroup).toEqual(component.muscleGroups[tricepsIndex]);
    expect(component.selectedExercise).toBeNull();
  });

  it('should display exercises for triceps', () => {
    component.showExercises(tricepsIndex);
    if (component.selectedMuscleGroup) {
      expect(component.selectedMuscleGroup.exercises).toEqual(['Tricep extensions', 'Skull crushers']);
    } else {
      fail('selectedMuscleGroup should not be null');
    }
  });
});

describe('calves musclegroup', () => {
  const calvesIndex = 5;

  it('should select calves when showExercises is called with index 5', () => {
    component.showExercises(calvesIndex);
    expect(component.selectedMuscleGroup).toEqual(component.muscleGroups[calvesIndex]);
    expect(component.selectedExercise).toBeNull();
  });

  it('should display exercises for calves', () => {
    component.showExercises(calvesIndex);
    if (component.selectedMuscleGroup) {
      expect(component.selectedMuscleGroup.exercises).toEqual(['Calf raises', 'Calf stretches']);
    } else {
      fail('selectedMuscleGroup should not be null');
    }
  });
});

describe('shoulders musclegroup', () => {
  const shoulderIndex = 6;

  it('should select shoulders when showExercises is called with index 6', () => {
    component.showExercises(shoulderIndex);
    expect(component.selectedMuscleGroup).toEqual(component.muscleGroups[shoulderIndex]);
    expect(component.selectedExercise).toBeNull();
  });

  it('should display exercises for shoulders', () => {
    component.showExercises(shoulderIndex);
    if (component.selectedMuscleGroup) {
      expect(component.selectedMuscleGroup.exercises).toEqual(['Lateral raises', 'Front raises']);
    } else {
      fail('selectedMuscleGroup should not be null');
    }
  });
});

describe('biceps musclegroup', () => {
  const bicepsIndex = 7;

  it('should select biceps when showExercises is called with index 7', () => {
    component.showExercises(bicepsIndex);
    expect(component.selectedMuscleGroup).toEqual(component.muscleGroups[bicepsIndex]);
    expect(component.selectedExercise).toBeNull();
  });

  it('should display exercises for biceps', () => {
    component.showExercises(bicepsIndex);
    if (component.selectedMuscleGroup) {
      expect(component.selectedMuscleGroup.exercises).toEqual(['Cable curls', 'Hammer curls']);
    } else {
      fail('selectedMuscleGroup should not be null');
    }
  });
});

describe('glutes musclegroup', () => {
  const glutesIndex = 8;

  it('should select glutes when showExercises is called with index 8', () => {
    component.showExercises(glutesIndex);
    expect(component.selectedMuscleGroup).toEqual(component.muscleGroups[glutesIndex]);
    expect(component.selectedExercise).toBeNull();
  });

  it('should display exercises for glutes', () => {
    component.showExercises(glutesIndex);
    if (component.selectedMuscleGroup) {
      expect(component.selectedMuscleGroup.exercises).toEqual(['Hip thrusts', 'Cable pull-throughs']);
    } else {
      fail('selectedMuscleGroup should not be null');
    }
  });
});

describe('oblique musclegroup', () => {
  const obliqueIndex = 9;

  it('should select oblique when showExercises is called with index 9', () => {
    component.showExercises(obliqueIndex);
    expect(component.selectedMuscleGroup).toEqual(component.muscleGroups[obliqueIndex]);
    expect(component.selectedExercise).toBeNull();
  });

  it('should display exercises for obliques', () => {
    component.showExercises(obliqueIndex);
    if (component.selectedMuscleGroup) {
      expect(component.selectedMuscleGroup.exercises).toEqual(['Woodchoppers', 'Russian twist']);
    } else {
      fail('selectedMuscleGroup should not be null');
    }
  });
});


})


