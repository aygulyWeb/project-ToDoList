class Authorization {
	constructor({ input, form, login, password, button }) {
		this.input = document.querySelectorAll(input);
		this.form = document.querySelector(form);
		this.login = document.querySelector(login);
		this.password = document.querySelector(password);
		this.button = document.querySelector(button);

	}

	init() {
		this.createAcc();
		this.validLogin();
		this.validPassword();
	}


	validLogin(login) {
		let re = /^[a-z0-9_-]{5,16}$/;
		return re.test(String(login).toLowerCase());
	}
	validPassword(password) {
		let rePass = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
		return rePass.test(String(password));
	}

	createAcc() {
		this.form.addEventListener('submit', (e) => {
			let emptyInputs = Array.from(this.input).filter(item => item.value === '');

			// e.preventDefault();

			this.input.forEach(function (elem) {
				if (elem.value === '') {
					elem.classList.add('error');
				} else {
					elem.classList.remove('error');
				}
			})

			if (emptyInputs.length !== 0) {
				console.log('inputs not field')
				return false;
			}

			if (!this.validLogin(this.login.value)) {
				this.login.classList.add('error');
				return false;
			};

			if (!this.validPassword(this.password.value)) {
				this.password.classList.add('error');
				return false;
			};

		})

	}
}


const reg = new Authorization({
	input: 'input',
	form: '.reg-form',
	login: '#reg-login',
	password: '#reg-password',
	button: '.reg-btn'
})

reg.init();

