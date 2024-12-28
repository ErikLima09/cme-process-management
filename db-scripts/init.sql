--
-- PostgreSQL database dump
--

-- Dumped from database version 13.18 (Debian 13.18-1.pgdg120+1)
-- Dumped by pg_dump version 17.0

-- Started on 2024-12-28 12:36:32

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3060 (class 1262 OID 16384)
-- Name: mydatabase; Type: DATABASE; Schema: -; Owner: user
--

ALTER DATABASE mydatabase OWNER TO "user";

\connect mydatabase

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: user
--

ALTER SCHEMA public OWNER TO "user";

--
-- TOC entry 3061 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: user
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 207 (class 1259 OID 16427)
-- Name: failures; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.failures (
    id integer NOT NULL,
    description text NOT NULL,
    "timestamp" timestamp without time zone,
    material_id integer NOT NULL
);


ALTER TABLE public.failures OWNER TO "user";

--
-- TOC entry 206 (class 1259 OID 16425)
-- Name: failures_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.failures_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.failures_id_seq OWNER TO "user";

--
-- TOC entry 3063 (class 0 OID 0)
-- Dependencies: 206
-- Name: failures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.failures_id_seq OWNED BY public.failures.id;


--
-- TOC entry 203 (class 1259 OID 16399)
-- Name: materials; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.materials (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    type character varying(100) NOT NULL,
    expiration_date date NOT NULL,
    serial character varying(100) NOT NULL,
    status character varying DEFAULT 'AGUARDANDO RECEBIMENTO'::character varying NOT NULL
);


ALTER TABLE public.materials OWNER TO "user";

--
-- TOC entry 202 (class 1259 OID 16397)
-- Name: materials_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.materials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.materials_id_seq OWNER TO "user";

--
-- TOC entry 3064 (class 0 OID 0)
-- Dependencies: 202
-- Name: materials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.materials_id_seq OWNED BY public.materials.id;


--
-- TOC entry 205 (class 1259 OID 16409)
-- Name: processes; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.processes (
    id integer NOT NULL,
    step character varying(100) NOT NULL,
    "timestamp" timestamp without time zone,
    status character varying(50) NOT NULL,
    material_id integer NOT NULL
);


ALTER TABLE public.processes OWNER TO "user";

--
-- TOC entry 204 (class 1259 OID 16407)
-- Name: processes_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.processes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.processes_id_seq OWNER TO "user";

--
-- TOC entry 3065 (class 0 OID 0)
-- Dependencies: 204
-- Name: processes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.processes_id_seq OWNED BY public.processes.id;


--
-- TOC entry 201 (class 1259 OID 16387)
-- Name: users; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(80) NOT NULL,
    email character varying(120) NOT NULL,
    password character varying(200) NOT NULL,
    role character varying(50) NOT NULL
);


ALTER TABLE public.users OWNER TO "user";

--
-- TOC entry 200 (class 1259 OID 16385)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO "user";

--
-- TOC entry 3066 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2900 (class 2604 OID 16430)
-- Name: failures id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.failures ALTER COLUMN id SET DEFAULT nextval('public.failures_id_seq'::regclass);


--
-- TOC entry 2897 (class 2604 OID 16402)
-- Name: materials id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.materials ALTER COLUMN id SET DEFAULT nextval('public.materials_id_seq'::regclass);


--
-- TOC entry 2899 (class 2604 OID 16412)
-- Name: processes id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.processes ALTER COLUMN id SET DEFAULT nextval('public.processes_id_seq'::regclass);


--
-- TOC entry 2896 (class 2604 OID 16390)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3054 (class 0 OID 16427)
-- Dependencies: 207
-- Data for Name: failures; Type: TABLE DATA; Schema: public; Owner: user
--



--
-- TOC entry 3050 (class 0 OID 16399)
-- Dependencies: 203
-- Data for Name: materials; Type: TABLE DATA; Schema: public; Owner: user
--

INSERT INTO public.materials VALUES (2, 'Papel grau cirúrgico', 'Material de embalagem para esterilização', '2029-12-26', 'Papel grau cirúrgico-Material de embalagem para esterilização-2', 'AGUARDANDO RECEBIMENTO');
INSERT INTO public.materials VALUES (4, 'MaterialTeste', 'Quimico', '2025-09-26', 'MaterialTeste-Quimico-3', 'AGUARDANDO RECEBIMENTO');
INSERT INTO public.materials VALUES (15, 'Teste', 'embalagem', '2025-02-27', 'EMB002', 'AGUARDANDO RECEBIMENTO');
INSERT INTO public.materials VALUES (1, 'Alcooleditado', 'Quimico', '2026-12-02', 'Alcool-Quimico-1', 'AGUARDANDO RECEBIMENTO');
INSERT INTO public.materials VALUES (14, 'luva médica', 'embalagem', '2025-02-12', 'EMB001', 'AGUARDANDO RECEBIMENTO');


--
-- TOC entry 3052 (class 0 OID 16409)
-- Dependencies: 205
-- Data for Name: processes; Type: TABLE DATA; Schema: public; Owner: user
--

INSERT INTO public.processes VALUES (1, 'Recebimento', '2024-12-28 05:25:00.702079', 'Recebido', 2);
INSERT INTO public.processes VALUES (2, 'Recebimento', '2024-12-28 05:25:00.702079', 'Recebido', 14);
INSERT INTO public.processes VALUES (3, 'Lavagem', '2024-12-28 05:25:00.702079', 'Lavado', 2);
INSERT INTO public.processes VALUES (4, 'Esterilização', '2024-12-28 05:25:00.702079', 'Esterilizado', 2);
INSERT INTO public.processes VALUES (5, 'Distribuição', '2024-12-28 05:25:00.702079', 'Distribuído', 2);
INSERT INTO public.processes VALUES (6, 'Lavagem', '2024-12-28 05:25:00.702079', 'Lavado', 14);
INSERT INTO public.processes VALUES (7, 'Esterilização', '2024-12-28 05:25:00.702079', 'Esterilizado', 14);
INSERT INTO public.processes VALUES (8, 'Distribuição', '2024-12-28 05:25:00.702079', 'Distribuído', 14);


--
-- TOC entry 3048 (class 0 OID 16387)
-- Dependencies: 201
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: user
--

INSERT INTO public.users VALUES (75, 'Usertest', 'Usertest@test.com', 'scrypt:32768:8:1$Q8LWn1wUPqlpKuqh$dd4335356b626afea435daba54c7619edb0296a13e9a7e6a4b8545157d64e661a29b5362913ea2730e06bf7f22740510b0beb70948586d407dcfd4f9ecb805e3', 'admin');


--
-- TOC entry 3067 (class 0 OID 0)
-- Dependencies: 206
-- Name: failures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.failures_id_seq', 1, false);


--
-- TOC entry 3068 (class 0 OID 0)
-- Dependencies: 202
-- Name: materials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.materials_id_seq', 15, true);


--
-- TOC entry 3069 (class 0 OID 0)
-- Dependencies: 204
-- Name: processes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.processes_id_seq', 8, true);


--
-- TOC entry 3070 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.users_id_seq', 75, true);


--
-- TOC entry 2914 (class 2606 OID 16435)
-- Name: failures failures_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.failures
    ADD CONSTRAINT failures_pkey PRIMARY KEY (id);


--
-- TOC entry 2908 (class 2606 OID 16404)
-- Name: materials materials_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.materials
    ADD CONSTRAINT materials_pkey PRIMARY KEY (id);


--
-- TOC entry 2910 (class 2606 OID 16406)
-- Name: materials materials_serial_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.materials
    ADD CONSTRAINT materials_serial_key UNIQUE (serial);


--
-- TOC entry 2912 (class 2606 OID 16414)
-- Name: processes processes_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.processes
    ADD CONSTRAINT processes_pkey PRIMARY KEY (id);


--
-- TOC entry 2902 (class 2606 OID 16396)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2904 (class 2606 OID 16392)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2906 (class 2606 OID 16394)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 2916 (class 2606 OID 16436)
-- Name: failures failures_material_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.failures
    ADD CONSTRAINT failures_material_id_fkey FOREIGN KEY (material_id) REFERENCES public.materials(id);


--
-- TOC entry 2915 (class 2606 OID 16415)
-- Name: processes processes_material_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.processes
    ADD CONSTRAINT processes_material_id_fkey FOREIGN KEY (material_id) REFERENCES public.materials(id);


--
-- TOC entry 3062 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: user
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2024-12-28 12:36:32

--
-- PostgreSQL database dump complete
--

