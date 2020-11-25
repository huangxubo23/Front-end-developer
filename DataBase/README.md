# SQL 教程

什么是 SQL？简单地说，SQL 就是访问和处理关系数据库的计算机标准语言。

## 关系数据库概述

### 数据模型

数据库按照数据结构来组织、存储和管理数据，实际上，数据库一共有三种模型：

- 层次模型

* 网状模型

- 关系模型

随着时间的推移和市场竞争，最终，基于关系模型的关系数据库获得了绝对市场份额。

为什么关系数据库获得了最广泛的应用？

因为相比层次模型和网状模型，关系模型理解和使用起来最简单。

### 数据类型

对于一个关系表，除了定义每一列的名称外，还需要定义每一列的数据类型。关系数据库支持的标准数据类型包括数值、字符串、时间等：

| 名称         |      类型      |                                                                                       说明 |
| ------------ | :------------: | :----------------------------------------------------------------------------------------- |
| INT          |      整型      |                                                             4 字节整数类型，范围约+/-21 亿 |
| BIGINT       |     长整型     |                                                          8 字节整数类型，范围约+/-922 亿亿 |
| REAL         |     浮点型     |                                                              4 字节浮点数，范围约+/-10^38^ |
| DOUBLE       |     浮点型     |                                                             8 字节浮点数，范围约+/-10^308^ |
| DECIMAL(M,N) |   高精度小数   | 由用户指定精度的小数，例如，DECIMAL(20,10)表示一共 20 位，其中小数 10 位，通常用于财务计算 |
| CHAR(N)      |   定长字符串   |                           存储指定长度的字符串，例如，CHAR(100)总是存储 100 个字符的字符串 |
| VARCHAR(N)   |   变长字符串   |                      存储可变长度的字符串，例如，VARCHAR(100)可以存储 0~100 个字符的字符串 |
| BOOLEAN      |    布尔类型    |                                                                       存储 True 或者 False |
| DATE         |    日期类型    |                                                                 存储日期，例如，2020-11-25 |
| TIME         |    时间类型    |                                                                   存储时间，例如，10:55:23 |
| DATETIME     | 日期和时间类型 |                                                   存储日期+时间，例如，2020-11-25 10:55:23 |

上面的表中列举了最常用的数据类型。很多数据类型还有别名，例如，`REAL`又可以写成`FLOAT(24)`。还有一些不常用的数据类型，例如，`TINYINT`（范围在 0~255）。各数据库厂商还会支持特定的数据类型，例如`JSON`。

选择数据类型的时候，要根据业务规则选择合适的类型。通常来说，`BIGINT`能满足整数存储的需求，`VARCHAR(N)`能满足字符串存储的需求，这两种类型是使用最广泛的。

### SQL

什么是 SQL？SQL 是结构化查询语言（Structured Query Language）的缩写，用来访问和操作数据库系统。SQL 语句既可以查询数据库中的数据，也可以添加、更新和删除数据库中的数据，还可以对数据库进行管理和维护操作。不同的数据库，都支持 SQL，这样，我们通过学习 SQL 这一种语言，就可以操作各种不同的数据库。

总的来说，SQL 语言定义了这么几种操作数据库的能力：

- **DDL（Data Definition Language-数据定义语言）：** DDL 允许用户定义数据，也就是创建表、删除表、修改表结构这些操作。通常，DDL 由数据库管理员执行。
- **DML（Data Manipulation Language-数据操作语言）：** DML 为用户提供添加、删除、更新数据的能力，这些是应用程序对数据库的日常操作。
- **DQL（Data Query Language-数据查询语言）：** DQL 允许用户查询数据，这也是通常最频繁的数据库日常操作。

### 语法特点

SQL 语言关键字不区分大小写！！！但是，针对不同的数据库，对于表名和列名，有的数据库区分大小写，有的数据库不区分大小写。同一个数据库，有的在 Linux 上区分大小写，有的在 Windows 上不区分大小写。

所以，本教程约定：SQL 关键字总是大写，以示突出，表名和列名均使用小写。

## 关系模型

在关系数据库中，关系是通过主键和外键来维护的。

### 主键

在关系数据库中，一张表中的每一行数据被称为一条记录。一条记录就是由多个字段组成的。

每一条记录都包含若干定义好的字段。同一个表的所有记录都有相同的字段定义。

对于关系表，有个很重要的约束，就是任意两条记录不能重复。不能重复不是指两条记录不完全相同，而是指能够通过某个字段唯一区分出不同的记录，这个字段被称为`主键`。

对主键的要求，最关键的一点是：记录一旦插入到表中，主键最好不要再修改，因为主键是用来唯一定位记录的，修改了主键，会造成一系列的影响。

选取主键的一个基本原则是：不使用任何业务相关的字段作为主键。

作为主键最好是完全业务无关的字段，我们一般把这个字段命名为`id`。常见的可作为`id`字段的类型有：

- **自增整数类型：** 数据库会在插入数据时自动为每一条记录分配一个自增整数，这样我们就完全不用担心主键重复，也不用自己预先生成主键。_如果使用 INT 自增类型，那么当一张表的记录数超过 2147483647（约 21 亿）时，会达到上限而出错。使用 BIGINT 自增类型则可以最多约 922 亿亿条记录。_
- **全局唯一 GUID 类型：** 使用一种全局唯一的字符串作为主键，类似`8f55d96b-8acc-4636-8cb8-76bf8abc2f57`。GUID 算法通过网卡 MAC 地址、时间戳和随机数保证任意计算机在任意时间生成的字符串都是不同的，大部分编程语言都内置了 GUID 算法，可以自己预算出主键。

#### 联合主键

关系数据库实际上还允许通过多个字段唯一标识记录，即两个或更多的字段都设置为主键，这种主键被称为联合主键。

对于联合主键，允许一列有重复，只要不是所有主键列都重复即可。

没有必要的情况下，我们尽量不使用联合主键，因为它给关系表带来了复杂度的上升。

#### 小结

主键是关系表中记录的唯一标识。主键的选取非常重要：主键不要带有业务含义，而应该使用 BIGINT 自增或者 GUID 类型。主键也不应该允许 NULL。

可以使用多个列作为联合主键，但联合主键并不常用。

### 外键

在 students 表中，通过 class_id 的字段，可以把数据与另一张表关联起来，这种列称为`外键`。

关系数据库通过外键可以实现`一对多`、`多对多`和`一对一`的关系。外键既可以通过数据库来约束，也可以不设置约束，仅依靠应用程序的逻辑来保证。

### 索引

在关系数据库中，如果有上万甚至上亿条记录，在查找记录的时候，想要获得非常快的速度，就需要使用索引。

索引是关系数据库中对某一列或多个列的值进行预排序的数据结构。通过使用索引，可以让数据库系统不必扫描整个表，而是直接定位到符合条件的记录，这样就大大加快了查询速度。

```sql
ALTER TABLE students
-- 创建了一个名称为idx_name_score，使用列name和score的索引
ADD INDEX idx_name_score (name, score);
```

索引的效率取决于索引列的值是否散列，即该列的值如果越互不相同，那么索引效率越高。反过来，如果记录的列存在大量相同的值，例如 gender（性别）列，大约一半的记录值是 M（男），另一半是 F（女），因此，对该列创建索引就没有意义。

可以对一张表创建多个索引。索引的优点是提高了查询效率，缺点是在插入、更新和删除记录时，需要同时修改索引，因此，索引越多，插入、更新和删除记录的速度就越慢。

对于主键，关系数据库会自动对其创建主键索引。使用主键索引的效率是最高的，因为主键会保证绝对唯一。

#### 唯一索引

在设计关系数据表的时候，看上去唯一的列，例如手机号、身份证号、邮箱地址等，因为他们具有业务含义，因此不宜作为主键。

但是，这些列根据业务要求，又具有唯一性约束：即不能出现两条记录存储了同一个身份证号。这个时候，就可以给该列添加一个唯一索引。例如，我们假设 students 表的 phone 不能重复：

```sql
ALTER TABLE students
-- 通过UNIQUE关键字我们就添加了一个唯一索引。
ADD UNIQUE INDEX uni_phone (phone);
```

也可以只对某一列添加一个唯一约束而不创建唯一索引：

```sql
ALTER TABLE students
-- 只对某一列添加一个唯一约束而不创建唯一索引
ADD CONSTRAINT uni_phone UNIQUE (phone);
```

无论是否创建索引，对于用户和应用程序来说，使用关系数据库不会有任何区别。这里的意思是说，当我们在数据库中查询时，如果有相应的索引可用，数据库系统就会自动使用索引来提高查询效率，如果没有索引，查询也能正常执行，只是速度会变慢。因此，索引可以在使用数据库的过程中逐步优化。

#### 小结

通过对数据库表创建索引，可以提高查询速度。

通过创建唯一索引，可以保证某一列的值具有唯一性。

数据库索引对于用户和应用程序来说都是透明的。

## 查询数据

### 基本查询

要查询数据库表的数据，我们使用如下的 SQL 语句：

```sql
SELECT * FROM <表名>
```

```sql
-- SELECT:是关键字，表示将要执行一个查询
-- *:表示“所有列”
-- FROM:表示将要从哪个表查询
SELECT * FROM students;
```

````sql
SELECT id, class_id, name, gender FROM students;
```sql

SELECT查询的结果是一个二维表，它包含列名和每一行的数据。

```sql
SELECT 1 + 1;
--  输出 2
````

上述查询会直接计算出表达式的结果。虽然`SELECT`可以用作计算，但它并不是 SQL 的强项。但是，不带 FROM 子句的 SELECT 语句有一个有用的用途，就是用来判断当前到数据库的连接是否有效。许多检测工具会执行一条`SELECT 1`;来测试数据库连接。

### 条件查询

SELECT 语句可以通过`WHERE`条件来设定查询条件，查询结果是满足查询条件的记录。条件查询的语法是：

```sql
SELECT * FROM <表名> WHERE <条件表达式>
```

#### AND

```sql
-- 注意gender列存储的是字符串，需要用单引号括起来
SELECT * FROM students WHERE score >= 80 AND gender = 'M';
```

#### OR

```sql
SELECT * FROM students WHERE score >= 80 OR gender = 'M';
```

#### NOT

```
SELECT * FROM students WHERE NOT class_id = 2;
```

如果不加括号，条件运算按照`NOT`、`AND`、`OR`的优先级进行，即`NOT`优先级最高，其次是`AND`，最后是`OR`。加上括号可以改变优先级。

#### 常用的条件表达式

| 条件                 |  表达式举例 1   |   表达式举例 2   |                                                说明 |
| -------------------- | :-------------: | :--------------: | --------------------------------------------------: |
| 使用=判断相等        |   score = 80    |   name = 'abc'   |                            字符串需要用单引号括起来 |
| 使用>判断大于        |   score > 80    |   name > 'abc'   | 字符串比较根据 ASCII 码，中文字符比较根据数据库设置 |
| 使用>=判断大于或相等 |   score >= 80   |  name >= 'abc'   |
| 使用<判断小于        |   score < 80    |  name <= 'abc'   |
| 使用<=判断小于或相等 |   score <= 80   |  name <= 'abc'   |
| 使用<>判断不相等     |   score <> 80   |  name <> 'abc'   |                              判断不相等也可以使用!= |
| 使用 LIKE 判断相似   | name LIKE 'ab%' | name LIKE '%bc%' |   %表示任意字符，例如'ab%'将匹配'ab'，'abc'，'abcd' |

#### 小结

通过`WHERE`条件查询，可以筛选出符合指定条件的记录，而不是整个表的所有记录。

### 投影查询

如果我们只希望返回某些列的数据，而不是所有列的数据，我们可以用`SELECT 列1, 列2, 列3 FROM ...`，让结果集仅包含指定列。这种操作称为`投影查询`。

```sql
SELECT 列1 别名1, 列2 别名2, 列3 别名3 FROM ...
```

```sql
SELECT id, score points, name FROM students;
```

这样返回的结果集就只包含了我们指定的列，并且，结果集的列的顺序和原表可以不一样。

#### 小结

使`SELECT *`表示查询表的所有列，使用`SELECT 列1, 列2, 列3`则可以仅返回指定列，这种操作称为`投影查询`。

SELECT 语句可以对结果集的列进行重命名。

### 排序

我们使用 SELECT 查询时，细心的读者可能注意到，查询结果集通常是按照 id 排序的，也就是根据主键排序。这也是大部分数据库的做法。如果我们要根据其他条件排序怎么办？可以加上`ORDER BY`子句。

- ASC：“升序”，即从小到大，从低到高。ASC 是默认排序规则，可以省略
- DESC：“倒序”，即从大到小，从高到低

```sql
SELECT id, name, gender, score
FROM students
WHERE class_id = 1
ORDER BY score DESC, gender;
```

#### 小结

使用`ORDER BY`可以对结果集进行排序。

可以对多列进行升序（ASC）、倒序（DESC）排序。

### 分页查询

分页查询可以通过`LIMIT <M> OFFSET <N>`子句实现。

分页查询的关键在于，首先要确定每页需要显示的结果数量 pageSize（这里是 10），然后根据当前页的索引 pageIndex（从 1 开始），确定 LIMIT 和 OFFSET 应该设定的值：

- LIMIT 总是设定为 pageSize
- OFFSET 计算公式为 pageSize \* (pageIndex - 1)

```sql
SELECT id, name, gender, score
FROM students
ORDER BY score DESC
-- 例如pageSize=10, pageIndex=3, OFFSET=10*(3-1) = 20
LIMIT 10 OFFSET 20;
```

#### 小结

使用`LIMIT <M> OFFSET <N>`可以对结果集进行分页，每次查询返回结果集的一部分。

分页查询需要先确定每页的数量和当前页数，然后确定`LIMIT`和`OFFSET`的值。

### 聚合查询

对于统计总数、平均数这类计算，SQL 提供了专门的聚合函数，使用聚合函数进行查询，就是`聚合查询`，它可以快速获得结果。

```sql
-- COUNT(*)表示查询所有列的行数，COUNT(*)和COUNT(id)实际上是一样的效果
SELECT COUNT(*) boys FROM students WHERE gender = 'M';
-- SUN计算某一列的合计值，该列必须为数值类型
SELECT SUM(score) sum_score FROM students WHERE gender = 'M';
-- AVG计算某一列的平均值，该列必须为数值类型
SELECT AVG(score) average FROM students WHERE gender = 'M';
-- MAX计算某一列的最大值
SELECT MAX(score) max_score FROM students WHERE gender = 'M';
-- MIN计算某一列的最小值
SELECT MIN(score) max_score FROM students WHERE gender = 'M';
```

要特别注意：如果聚合查询的 WHERE 条件没有匹配到任何行，`COUNT()`会返回`0`，而`SUM()`、`AVG()`、`MAX()`和`MIN()`会返回`NULL`。

#### 分组

对于聚合查询，SQL 还提供了“分组聚合”的功能。

```sql
SELECT class_id, COUNT(*) total_count
FROM students
GROUP BY class_id;
```

```sql
SELECT class_id, AVG(score) score_avg
FROM students
WHERE gender = 'M'
GROUP BY class_id;
```

#####

使用 SQL 提供的聚合查询，我们可以方便地计算总数、合计值、平均值、最大值和最小值；

聚合查询也可以添加 WHERE 条件。

### 多表查询

SELECT 查询不但可以从一张表查询数据，还可以从多张表同时查询数据。查询多张表的语法是：`SELECT * FROM <表1> <表2>`。

这种多表查询又称`笛卡尔查询`，使用笛卡尔查询时要非常小心，由于结果集是目标表的行数乘积，对两个各自有 100 行记录的表进行笛卡尔查询将返回 1 万条记录，对两个各自有 1 万行记录的表进行笛卡尔查询将返回 1 亿条记录。


```sql
SELECT * FROM students, classes;
```

可以利用投影查询的“设置列的别名”来给两个表各自的`id`和`name`列起别名：

```sql
SELECT
  students.id student_id,
  students.name student_name,
  students.gender,
  students.score,
  classes.id class_id,
  classes.name class_name
FROM students, classes;
```
SQL还允许给表设置一个别名，让我们在投影查询中引用起来稍微简洁一点，注意到FROM子句给表设置别名的语法是`FROM <表名1> <表别名1>, <表名2> <表别名2>`，多表查询也是可以添加`WHERE`条件的：

```sql
SELECT
  s.id sid,
  s.name,
  s.gender,
  s.score,
  c.id cid,
  c.name cname
FROM students s, classes c
WHERE s.gender = 'M' AND c.id = 1;
```

#### 小结
使用多表查询可以获取M x N行记录；

多表查询的结果集可能非常巨大，要小心使用。


### 连接查询
**内连接（INNER JOIN）**，最常用的一种连接查询：
```sql
SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
-- 先确定主表，仍然使用FROM <表1>的语法
FROM students s
-- 再确定需要连接的表，使用INNER JOIN <表2>的语法
INNER JOIN classes c
-- 然后确定连接条件，使用ON <条件...>
ON s.class_id = c.id;
-- 可选：加上WHERE子句、ORDER BY等子句
WHERE s.score >= 90
ORDER BY s.score DESC
```

`INNER JOIN（内连接）`是选出两张表都存在的记录

![INNER JOIN](https://github.com/huangxubo23/Front-end-developer/blob/master/DataBase/images/Query_INNER%20JOIN.png)

`LEFT OUTER JOIN（左连接）`是选出左表存在的记录

![LEFT OUTER JOIN](https://github.com/huangxubo23/Front-end-developer/blob/master/DataBase/images/Query_LEFT%20OUTER%20JOIN.png)

`RIGHT OUTER JOIN（右连接）`是选出右表存在的记录

![RIGHT OUTER JOIN](https://github.com/huangxubo23/Front-end-developer/blob/master/DataBase/images/Query_RIGHT%20OUTER%20JOIN.png)

`FULL OUTER JOIN（全连接）`则是选出左右表都存在的记录

![FULL OUTER JOIN](https://github.com/huangxubo23/Front-end-developer/blob/master/DataBase/images/Query_FULL%20OUTER%20JOIN.png)

#### 小结

`JOIN`查询需要先确定主表，然后把另一个表的数据“附加”到结果集上；

`INNER JOIN`是最常用的一种JOIN查询，它的语法是`SELECT ... FROM <表1> INNER JOIN <表2> ON <条件...>`；

JOIN查询仍然可以使用`WHERE`条件和`ORDER BY`排序。



## 修改数据
关系数据库的基本操作就是增删改查，即CRUD：Create、Retrieve、Update、Delete。其中，对于查询，我们已经详细讲述了SELECT语句的详细用法。

而对于增、删、改，对应的SQL语句分别是：
- INSERT：插入新记录；
- UPDATE：更新已有记录；
- DELETE：删除已有记录。


### INSERT
当我们需要向数据库表中插入一条新记录时，就必须使用INSERT语句。

INSERT语句的基本语法是：
```sql
INSERT INTO <表名> (字段1, 字段2, ...) VALUES (值1, 值2, ...);
```

```sql
INSERT INTO students (class_id, name, gender, score) 
VALUES
  (1, '大宝', 'M', 87),
  (2, '二宝', 'F', 81);
```

#### 小结
使用`INSERT`，我们就可以一次向一个表中插入一条或多条记录。


### UPDATE
如果要更新数据库表中的记录，我们就必须使用UPDATE语句。

UPDATE语句的基本语法是：
```sql
UPDATE <表名> SET 字段1=值1, 字段2=值2, ... WHERE ...;
```

```sql
UPDATE students SET name='大牛', score=66 WHERE id=1;
```

在UPDATE语句中，可以一次更新多条记录，同时更新字段时可以使用表达式。例如，把所有80分以下的同学的成绩加10分：
```sql
UPDATE students SET score=score+10 WHERE score<80;
```

#### 小结
使用`UPDATE`，我们就可以一次更新表中的一条或多条记录。

不带`WHERE`条件的`UPDATE`语句会更新整个表的数据。

如果`WHERE`条件没有匹配到任何记录，`UPDATE`语句不会报错，也不会有任何记录被更新。


### DELETE
如果要删除数据库表中的记录，我们可以使用DELETE语句。

DELETE语句的基本语法是：
```sql
DELETE FROM <表名> WHERE ...;
```

```sql
DELETE FROM students WHERE id>=5 AND id<=7;
```

#### 小结
使用`DELETE`，我们就可以一次删除表中的一条或多条记录。

不带`WHERE`条件的`DELETE`语句会删除整个表的数据。

## MySQL
### 实用SQL语句
**插入或替换**

如果我们希望插入一条新记录（INSERT），但如果记录已经存在，就先删除原记录，再插入新记录。此时，可以使用`REPLACE`语句，这样就不必先查询，再决定是否先删除再插入：
```sql
-- 若id=1的记录不存在，REPLACE语句将插入新记录，否则，当前id=1的记录将被删除，然后再插入新记录。
REPLACE INTO students (id, class_id, name, gender, score)
VALUES (1, 1, '小明', 'F', 99);
```

**插入或更新**

如果我们希望插入一条新记录（INSERT），但如果记录已经存在，就更新该记录，此时，可以使用`INSERT INTO ... ON DUPLICATE KEY UPDATE ...`语句：
```sql
-- 若id=1的记录不存在，INSERT语句将插入新记录，否则，当前id=1的记录将被更新，更新的字段由UPDATE指定
INSERT INTO students (id, class_id, name, gender, score) 
VALUES (1, 1, '小明', 'F', 99) 
ON DUPLICATE KEY 
UPDATE name='小明', gender='F', score=99;
```

**插入或忽略**

如果我们希望插入一条新记录（INSERT），但如果记录已经存在，就啥事也不干直接忽略，此时，可以使用`INSERT IGNORE INTO ...`语句：
```sql
-- 若id=1的记录不存在，INSERT语句将插入新记录，否则，不执行任何操作
INSERT IGNORE INTO students (id, class_id, name, gender, score) 
VALUES (1, 1, '小明', 'F', 99);
```

**快照**

如果想要对一个表进行快照，即复制一份当前表的数据到一个新表，可以结合`CREATE TABLE`和`SELECT`：
```sql
-- 对class_id=1的记录进行快照，并存储为新表students_of_class1:
CREATE TABLE students_of_class1 SELECT * FROM students WHERE class_id=1;
```

**写入查询结果集**

```sql
-- 创建一个统计成绩的表statistics，记录各班的平均成绩
CREATE TABLE statistics (
  id BIGINT NOT NULL AUTO_INCREMENT,
  class_id BIGINT NOT NULL,
  average DOUBLE NOT NULL,
  PRIMARY KEY (id)
);

-- 然后，我们就可以用一条语句写入各班的平均成绩
INSERT INTO statistics (class_id, average) 
SELECT class_id, AVG(score)
FROM students 
GROUP BY class_id;
```

**强制使用指定索引**

在查询的时候，数据库系统会自动分析查询语句，并选择一个最合适的索引。但是很多时候，数据库系统的查询优化器并不一定总是能使用最优索引。如果我们知道如何选择索引，可以使用`FORCE INDEX`强制查询使用指定的索引。例如：
```sql
SELECT * FROM students FORCE INDEX (idx_class_id) 
WHERE class_id = 1 
ORDER BY id DESC;
```


## 事务
把多条语句作为一个整体进行操作的功能，被称为数据库`事务`。数据库事务可以确保该事务范围内的所有操作都可以全部成功或者全部失败。如果事务失败，那么效果就和没有执行这些SQL一样，不会对数据库数据有任何改动。

可见，数据库事务具有ACID这4个特性：
- A：Atomic，原子性，将所有SQL作为原子工作单元执行，要么全部执行，要么全部不执行；
- C：Consistent，一致性，事务完成后，所有数据的状态都是一致的，即A账户只要减去了100，B账户则必定加上了100；
- I：Isolation，隔离性，如果有多个事务并发执行，每个事务作出的修改必须与其他事务隔离；
- D：Duration，持久性，即事务完成后，对数据库数据的修改被持久化存储。

对于单条SQL语句，数据库系统自动将其作为一个事务执行，这种事务被称为`隐式事务`。

要手动把多条SQL语句作为一个事务执行，使用`BEGIN`开启一个事务，使用`COMMIT`提交一个事务，这种事务被称为`显式事务`，例如，可以把转账操作作为一个显式事务：
```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```
很显然多条SQL语句要想作为一个事务执行，就必须使用显式事务。

`COMMIT`是指提交事务，即试图把事务内的所有SQL所做的修改永久保存。如果`COMMIT`语句执行失败了，整个事务也会失败。

有些时候，我们希望主动让事务失败，这时，可以用`ROLLBACK`回滚事务，整个事务会失败：
```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
-- 使用ROLLBACK回滚事务，整个事务会失败
ROLLBACK;
```

**隔离级别**

对于两个并发执行的事务，如果涉及到操作同一条记录的时候，可能会发生问题。因为并发操作会带来数据的不一致性，包括脏读、不可重复读、幻读等。数据库系统提供了隔离级别来让我们有针对性地选择事务的隔离级别，避免数据不一致的问题。

SQL标准定义了4种隔离级别，分别对应可能出现的数据不一致的情况：
Isolation Level |	脏读（Dirty Read） | 不可重复读（Non Repeatable Read）|	幻读（Phantom Read）
--- | --- | --- | ---
Read Uncommitted | Yes | Yes | Yes
Read Committed | - | Yes | Yes
Repeatable Read	| - | - | Yes
Serializable | - | - | -

### Read Uncommitted
`Read Uncommitted`是隔离级别最低的一种事务级别。在这种隔离级别下，一个事务会读到另一个事务更新后但未提交的数据，如果另一个事务回滚，那么当前事务读到的数据就是脏数据，这就是脏读（Dirty Read）。

### Read Committed
在`Read Committed`隔离级别下，一个事务可能会遇到不可重复读（Non Repeatable Read）的问题。

不可重复读是指，在一个事务内，多次读同一数据，在这个事务还没有结束时，如果另一个事务恰好修改了这个数据，那么，在第一个事务中，两次读取的数据就可能不一致。

### Repeatable Read
在`Repeatable Read`隔离级别下，一个事务可能会遇到幻读（Phantom Read）的问题。

幻读是指，在一个事务中，第一次查询某条记录，发现没有，但是，当试图更新这条不存在的记录时，竟然能成功，并且，再次读取同一条记录，它就神奇地出现了。

### Serializable
`Serializable`是最严格的隔离级别。在Serializable隔离级别下，所有事务按照次序依次执行，因此，脏读、不可重复读、幻读都不会出现。

虽然Serializable隔离级别下的事务具有最高的安全性，但是，由于事务是串行执行，所以效率会大大下降，应用程序的性能会急剧降低。如果没有特别重要的情景，一般都不会使用Serializable隔离级别。

### 默认隔离级别
如果没有指定隔离级别，数据库就会使用默认的隔离级别。在MySQL中，如果使用InnoDB，默认的隔离级别是Repeatable Read。
