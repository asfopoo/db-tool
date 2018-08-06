CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE rlinternal.internal_users (
	user_id uuid PRIMARY KEY DEFAULT uuid_generate_v1(),
	email varchar(300) UNIQUE NOT NULL,
	first_name varchar(300) NOT NULL,
	last_name varchar(300) NOT NULL,
	password TEXT NOT NULL,
	role_id BIGINT NOT NULL REFERENCES rlinternal.internal_roles,
	reset_password_token TEXT,
	reset_password_expires timestamp with time zone,
	email_validation_token uuid,
	created_at timestamp with time zone default timezone('utc', now()),
	updated_at timestamp with time zone default timezone('utc', now())
);

CREATE TABLE rlinternal.internal_roles (
	role_id BIGSERIAL PRIMARY KEY,
	role_name VARCHAR(100) NOT NULL,
	role_description TEXT NOT NULL,
	created_at timestamp with time zone default timezone('utc', now()),
	updated_at timestamp with time zone default timezone('utc', now())
);

CREATE TABLE rlinternal.internal_role_permissions (
	role_id BIGINT REFERENCES rlinternal.internal_roles ON DELETE CASCADE ON UPDATE CASCADE,
	permission_id BIGINT REFERENCES rlinternal.internal_permissions ON DELETE CASCADE ON UPDATE CASCADE,
	created_at timestamp with time zone default timezone('utc', now()),
	updated_at timestamp with time zone default timezone('utc', now()),
	PRIMARY KEY(role_id, permission_id)
);

CREATE TABLE rlinternal.internal_permissions (
	permission_id bigserial PRIMARY KEY,
	permission_name VARCHAR(100),
	permission_description TEXT NOT NULL,
	module_id BIGINT references rlinternal.internal_modules ,
	created_at timestamp with time zone default timezone('utc', now()),
	updated_at timestamp with time zone default timezone('utc', now())
);

CREATE TABLE rlinternal.internal_modules (
	module_id BIGSERIAL PRIMARY KEY,
	module_name VARCHAR(300) NOT NULL,
	module_description TEXT NOT NULL,
	created_at timestamp with time zone default timezone('utc', now()),
	updated_at timestamp with time zone default timezone('utc', now())
);

INSERT INTO rlinternal.internal_roles (role_name, role_description) VALUES('admin', 'Access To Everything');

INSERT INTO rlinternal.internal_roles (role_name, role_description) VALUES('manager', 'Access To Customers, and Can View Users');

INSERT INTO rlinternal.internal_roles (role_name, role_description) VALUES('user', 'View Access');

INSERT INTO rlinternal.internal_modules (module_name, module_description) VALUES('internal_users', 'Internal User Management');

INSERT INTO rlinternal.internal_modules (module_name, module_description)  VALUES('customers', 'Customer Management');

INSERT INTO rlinternal.internal_permissions VALUES('')

