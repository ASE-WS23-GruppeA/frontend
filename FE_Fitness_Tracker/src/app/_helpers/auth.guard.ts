import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { take, map } from "rxjs/operators";

export const authGuard: CanActivateFn = (
    route,
    state
) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.AuthenticatedUser$.pipe(
        take(1),
        map(user => {
            if (user) {
                return true;
            } else {
                return router.createUrlTree(['/login']);
            }
        })
    );
};
