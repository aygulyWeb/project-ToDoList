class Authorization {
	constructor({ input, form, regFormAuth, login, password, btnSubmit, regLinkAuth,
		createFormAcc, createPass, passwordConfirm, checkPass, btnCreate, createLinkAcc }) {

		this.form = document.querySelector(form);
		this.input = document.querySelectorAll(input);
		this.regFormAuth = document.querySelector(regFormAuth);
		this.login = document.querySelector(login);
		this.password = document.querySelector(password);
		this.btnSubmit = document.querySelector(btnSubmit);
		this.regLinkAuth = document.querySelector(regLinkAuth);


		this.createFormAcc = document.querySelector(createFormAcc);
		this.createPass = document.querySelector(createPass);
		this.passwordConfirm = document.querySelector(passwordConfirm);
		this.checkPass = document.querySelector(checkPass);
		this.btnCreate = document.querySelector(btnCreate);
		this.createLinkAcc = document.querySelector(createLinkAcc);

	}

	init() {
		this.getAuth();
		this.validLogin();
		this.validPassword();
		this.createAcc();
		this.showPassword();
		this.getRedirectCreate();
		this.getRedirectAcc();
		this.getLocalStorage();
	}
	getLocalStorage() {
		let obj = {
			login: this.login.value,
			password: this.password.value
		}
		let json = JSON.stringify(obj);

		if (localStorage.getItem('obj') === null) {
			localStorage.setItem('obj', json)
		}
		let objectReg = JSON.parse(localStorage.getItem('obj'));
		console.log(objectReg)

	}

	getRedirectCreate() {

		this.createFormAcc.classList.add('active');

		this.regLinkAuth.addEventListener('click', (e) => {

			e.preventDefault();

			if (this.regFormAuth.style.display = 'none') {
				this.createFormAcc.style.display = 'flex';
			}

		})
	}
	getRedirectAcc() {

		this.createLinkAcc.addEventListener('click', (e) => {
			e.preventDefault();

			if (this.createFormAcc.style.display = 'none') {
				this.regFormAuth.style.display = 'flex';
			}

		})
	}

	validLogin(login) {
		let re = /^[a-z0-9_-]{5,16}$/;
		return re.test(String(login).toLowerCase());
	}
	validPassword(password) {
		let rePass = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
		return rePass.test(String(password));
	}

	getAuth() {
		this.form.addEventListener('submit', (e) => {
			e.preventDefault();
			this.checkInputs();

			window.location.href = "index.html";

		})

	}
	createAcc() {
		this.form.addEventListener('submit', (e) => {
			e.preventDefault();

			this.checkInputs();

			if (this.createPass.value !== this.passwordConfirm.value) {
				this.passwordConfirm.classList.add('error');
				return false;
			}

			this.showPassword();

			window.location.href = "index.html";


		})
	}
	showPassword() {

		this.checkPass.addEventListener('click', () => {
			// e.preventDefault();
			if (this.createPass.getAttribute('type') === 'password' && this.passwordConfirm.getAttribute('type') === 'password') {
				this.createPass.setAttribute('type', 'text');
				this.passwordConfirm.setAttribute('type', 'text');
			} else {
				this.createPass.setAttribute('type', 'password');
				this.passwordConfirm.setAttribute('type', 'password');

			}
		});
	}

	checkInputs() {
		let emptyInputs = Array.from(this.input).filter(item => item.value === '');
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
	}
}


const reg = new Authorization({
	input: 'input',
	form: '.reg-form',
	// authorization
	regFormAuth: '#reg-form-auth',
	login: '#reg-login',
	password: '#reg-password',
	btnSubmit: '#reg-submit',
	regLinkAuth: '#reg-link-acc',
	// create new acc
	createFormAcc: '#create-form-acc',
	createPass: '#create-password',
	passwordConfirm: '#create-confirm',
	checkPass: '#create-check',
	btnCreate: '#create-create-btn',
	createLinkAcc: '#create-link-acc',

});

reg.init();

