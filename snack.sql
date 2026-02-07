drop table snackmember;
--user 데이터 테이블
CREATE table snackmember (
            USER_ID varchar2(20) not null primary key
           ,PASSWORD varchar2(20) not null
           ,NAME varchar2(50) not null
           ,TEL number(20) not null
           ,EMAIL VARCHAR2(100)
);

SELECT *
from snackmember;

--상품 데이터 테이블
drop table Sproduct;
CREATE table Sproduct (
            snack_no VARCHAR2(20) not null PRIMARY key
           ,snack_name VARCHAR2(50) not null
           ,price NUMBER(20) not null
           ,content VARCHAR2(100) not null
           ,weight VARCHAR2(50) not null
           ,kcal VARCHAR2(50) not null
           ,review number(20)
           ,delivery_C NUMBER(30) not null
           ,category_no number(20)
);
SELECT *
from Sproduct;

insert into Sproduct (snack_no, snack_name, price, content, weight, kcal, review, delivery_c, category_no)
values ('S0001', '홈런볼', 1800, '달콤하고 부드러운 과자입니다.', '43g', '270Kcal', 4, 3000, 10);
insert into Sproduct (snack_no, snack_name, price, content, weight, kcal, review, delivery_c, category_no)
values ('S0002', '사또밥', 1200, '사르르 녹는 과자입니다.', '67g', '350kcal', 5, 3000, 10);
insert into Sproduct (snack_no, snack_name, price, content, weight, kcal, review, delivery_c, category_no)
values ('S0003', '페레로로쉐', 3400, '달콤한 초콜릿입니다.', '63g', '382kcal', 3, 3000, 20);
insert into Sproduct (snack_no, snack_name, price, content, weight, kcal, review, delivery_c, category_no)
values ('S0004', '두바이초콜릿', 12000, '씹히는 카다이프가 일품입니다.', '200g', '992kcal', 2, 3000, 20);
insert into Sproduct (snack_no, snack_name, price, content, weight, kcal, review, delivery_c, category_no)
values ('S0005', '하리보', 15900, '귀여운 곰돌이 젤리입니다.', '100g', '337kcal', 4, 3000, 30);
insert into Sproduct (snack_no, snack_name, price, content, weight, kcal, review, delivery_c, category_no)
values ('S0006', '수수깡젤리', 790, '수수깡 모양 젤리입니다.', '125g', '485kcal', 4, 3000, 30);

--카테고리 데이터 테이블
CREATE table Scategory (
             category_no VARCHAR2(50)
            ,category_name VARCHAR2(50)
);

insert into Scategory (category_no, category_name)
values (10, '과자');
insert into Scategory (category_no, category_name)
values (20, '초콜릿');
insert into Scategory (category_no, category_name)
values (30, '젤리');

SELECT *
from Scategory;