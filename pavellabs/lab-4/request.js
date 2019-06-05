function requestPost({url, xml, callback}) {
	const req = new XMLHttpRequest();
			req.open('POST', url, true);
			req.setRequestHeader('Content-Type', 'text/xml');
			req.send(xml);

			req.onreadystatechange = () => {
				if (req.readyState != 4) return;
				if (req.status != 200) alert('Запрос не выполнился');

				const dom = req.responseXML;

				callback(dom);	  
		}
}