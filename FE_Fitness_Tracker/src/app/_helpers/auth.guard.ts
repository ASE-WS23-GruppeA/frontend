import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../_services/auth.service";
import {take, map} from "rxjs/operators";
import {MessageService} from "../_services/message.service";

export const authGuard: CanActivateFn = (
  route,
  state
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const messageService = inject(MessageService); // Inject the MessageService

  return authService.AuthenticatedUser$.pipe(
    take(1),
    map(user => {
      if (user) {
        return true;
      } else {
        messageService.changeMessage('Please log in to access this page.');

        return router.createUrlTree(['/log-in']);
      }
    })
  );
};
