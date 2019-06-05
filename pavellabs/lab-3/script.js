	//словарь
	const elts = {
		frmLog: document.querySelector('#frmLogin'),
		body: document.body,
		log: document.querySelector('#txtLogin'),
		pass: document.querySelector('#txtPassword'),
		err: document.querySelector('#divMessage'),
		list: document.querySelector('#divUsers').querySelector('ul'),
	}

	//Билет пользователя
		var ticket;

	// Класс UserInfo
		function UserInfo(login, password) {
			this.name = '';
			this.login = login;
			this.password = password;
		}
		
		// Класс Билет сессии
		/*
			function Ticket() {
				this.id = "";
				this.valid = false;
			}
		*/
	
		/*
		**
		**	Задание 1. Отображение формы
		**
		*/
		function showLoginForm(){
			const {frmLog, body} = elts;

			frmLog.classList.toggle('show');
			body.classList.toggle('grey');
		}
		
		/*
		**
		**	Задание 2. Проверка пользователя 
		**
		*/
		function validateUser() {

			const {log, pass} = elts;

			const user = new UserInfo(log.value, pass.value);

			const req = new XMLHttpRequest();

			req.open('POST', location.href + 'user_auth.php', true);
			req.setRequestHeader('Content-Type', 'text/plain');

			req.send(JSON.stringify(user));

			req.onreadystatechange = () => {

				if(req.readyState != 4) return;
				if(req.status != 200) alert('Какие-то проблемы с сервером');

				const data = JSON.parse(req.responseText);

				const {valid} = data;

				valid ? showLoginForm() : toggleErr();

				ticket = data;
			}
		}
		
		// Функция проверки пользователя
		// function validateUser(){}

		// Функция гашения сообщения об ошибке
		// function hideErrorMessage() {}

		// Функция переключения видимости сообщения об ошибке
		function toggleErr() {
			const {err} = elts;
			err.classList.toggle('show');
		}

		
		/*
		**
		**	Задание 3. Список пользователей
		**
		*/
		setInterval(showOnLineUsers, 3e3);

		function showOnLineUsers() {
			const {list} = elts;

			const req = new XMLHttpRequest();

			req.open('POST', location.href + 'get_online_users.php', true);
			req.setRequestHeader('Content-Type', 'text/plain');

			console.log(ticket);

			req.send(JSON.stringify(ticket));

			req.onreadystatechange = () => {

				if(req.readyState != 4) return;
				if(req.status != 200) alert('Какие-то проблемы с сервером');

				const data = JSON.parse(req.responseText);

				list.innerHTML = '';

				data.forEach( (item) => {
					list.insertAdjacentHTML(
						'beforeEnd',
						`<li>${item.name}</li>`
					)
				} )
			}
		}

		