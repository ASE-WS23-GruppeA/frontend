import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutHistoryService {

  private url = 'http://localhost:3001/analytics';
  constructor(private http: HttpClient) { }
 

  private mockWorkouts = [
    {
      "workoutID": 5,
      "userID": 1,
      "workoutName": "Chest Day",
      "createdDate": "2023-10-29T09:25:25.732Z",
      "workout_sets": [
          {
              "workoutSetsID": 13,
              "workoutID": 5,
              "exerciseID": 1,
              "reps": 12,
              "weights": 60
          },
          {
              "workoutSetsID": 14,
              "workoutID": 5,
              "exerciseID": 2,
              "reps": 10,
              "weights": 50
          }
      ]
  },
  {
      "workoutID": 7,
      "userID": 1,
      "workoutName": "Shoulder Day",
      "createdDate": "2023-10-29T09:26:06.767Z",
      "workout_sets": [
          {
              "workoutSetsID": 17,
              "workoutID": 7,
              "exerciseID": 7,
              "reps": 12,
              "weights": 40
          },
          {
              "workoutSetsID": 18,
              "workoutID": 7,
              "exerciseID": 8,
              "reps": 10,
              "weights": 35
          }
      ]
  },
  {
      "workoutID": 13,
      "userID": 1,
      "workoutName": "Yoga and Stretching",
      "createdDate": "2023-10-29T09:27:03.976Z",
      "workout_sets": []
  },
  {
    "workoutID": 13,
    "userID": 1,
    "workoutName": "Yoga and Stretching",
    "createdDate": "2023-10-29T09:27:03.976Z",
    "workout_sets": []
},
{
  "workoutID": 13,
  "userID": 1,
  "workoutName": "Yoga and Stretching",
  "createdDate": "2023-10-29T09:27:03.976Z",
  "workout_sets": []
}

  ]

private mockLastWorkout = {
    "workoutID": 13,
    "userID": 1,
    "workoutName": "Yoga and Stretching",
    "createdDate": "2023-10-29T09:27:03.976Z",
    "workout_sets": []
};

getAllWorkouts(userId: number): Observable<any[]> {
  return of(this.mockWorkouts.filter(w => w.userID === userId));
}

getLastWorkout(userId: number): Observable<any> {
  return of(this.mockLastWorkout);
}
}
