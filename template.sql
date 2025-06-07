use genericfilmsdb;
select * from cinema;
insert into cinema values(default, "Generic Films MS","Caraguatatuba", "Rua 5 Martin de Sá 50", "SP");

select * from room;
insert into room values(default, "A", 100, 10, 1);

select * from movie;
insert into movie values(default, "Kung Fu Panda", 120, "urldotrailer", "show de bolice", "jackie chan", "2025-05-05", "18", "panda", "autobot", "http://localhost:3000/uploads/angelo-1748818165294.jpg", "http://localhost:3000/uploads/angelo-1748818165294.jpg");

select * from session;
insert into session values(default, now(), "23:00", 10.50, "2D", "portugues do brasil", 1,1);

select * from user;
insert into user values(default, "angelo alves yoshimura generic", "angeloayg@genericfilms.com", "password", "12345678900", now(), 40028922);

select * from reserve;
insert into reserve values(default, now(), "pix", 0, "A50", 0, null, 1, 1);
