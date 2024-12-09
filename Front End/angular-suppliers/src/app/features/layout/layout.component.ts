import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
	public name: string = '';

	profileOpItems: MenuItem[] = [];

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.name = this.authService.username;

		this.profileOpItems = [
			{
				label: 'Logout',
				icon: 'pi pi-fw pi-sign-out',
				command: (event) => this.logout(),
			},
		];
	}

	private logout() {
		sessionStorage.clear();
		this.router.navigateByUrl('/auth/login');
	}
}
