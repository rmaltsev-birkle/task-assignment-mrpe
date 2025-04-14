USE content_db;

create table
  content_revisions (
    id int not null,
    version int not null,
    content text not null,
    constraint uc_content_revision unique (id, version)
  );

insert into
  content_revisions (id, version, content)
values
  (1, 1, "content-a 1"),
  (2, 1, "content-b 1"),
  (1, 2, "content-a 2"),
  (3, 1, "content-c 1"),
  (3, 2, "content-c 2"),
  (1, 3, "content-a 3"),
  (3, 3, "content-c 3"),
  (1, 4, "content-a 4");