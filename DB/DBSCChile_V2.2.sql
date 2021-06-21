PGDMP     .                    y         
   SCChileApp    13.2    13.2 "    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16571 
   SCChileApp    DATABASE     h   CREATE DATABASE "SCChileApp" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE "SCChileApp";
                postgres    false            �            1259    16574    alarma    TABLE     �   CREATE TABLE public.alarma (
    id_alarm integer NOT NULL,
    id_veci text NOT NULL,
    id_guard text,
    fecha text,
    estado text NOT NULL
);
    DROP TABLE public.alarma;
       public         heap    postgres    false            �            1259    16572    alarma_id_alarm_seq    SEQUENCE     �   CREATE SEQUENCE public.alarma_id_alarm_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.alarma_id_alarm_seq;
       public          postgres    false    201            �           0    0    alarma_id_alarm_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.alarma_id_alarm_seq OWNED BY public.alarma.id_alarm;
          public          postgres    false    200            �            1259    24765    escolta    TABLE     �   CREATE TABLE public.escolta (
    id_esc integer NOT NULL,
    id_veci text NOT NULL,
    id_guard text,
    fechahora text NOT NULL,
    modalidad text NOT NULL,
    estado_esc text NOT NULL,
    ref_direc text
);
    DROP TABLE public.escolta;
       public         heap    postgres    false            �            1259    24763    escolta_id_esc_seq    SEQUENCE     �   CREATE SEQUENCE public.escolta_id_esc_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.escolta_id_esc_seq;
       public          postgres    false    207            �           0    0    escolta_id_esc_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.escolta_id_esc_seq OWNED BY public.escolta.id_esc;
          public          postgres    false    206            �            1259    16599    guardia    TABLE     �   CREATE TABLE public.guardia (
    id_guard text NOT NULL,
    tipo text NOT NULL,
    name_guard text NOT NULL,
    rut text NOT NULL
);
    DROP TABLE public.guardia;
       public         heap    postgres    false            �            1259    16607    usuario_guardia    TABLE     b   CREATE TABLE public.usuario_guardia (
    id_guard text NOT NULL,
    pass_guard text NOT NULL
);
 #   DROP TABLE public.usuario_guardia;
       public         heap    postgres    false            �            1259    16591    usuario_vecino    TABLE     _   CREATE TABLE public.usuario_vecino (
    id_veci text NOT NULL,
    pass_veci text NOT NULL
);
 "   DROP TABLE public.usuario_vecino;
       public         heap    postgres    false            �            1259    16583    vecino    TABLE     �   CREATE TABLE public.vecino (
    id_veci text NOT NULL,
    direccion text NOT NULL,
    name_contact text NOT NULL,
    numb_contact text NOT NULL,
    name_contact2 text,
    numb_contact2 text,
    estado text NOT NULL
);
    DROP TABLE public.vecino;
       public         heap    postgres    false            >           2604    16577    alarma id_alarm    DEFAULT     r   ALTER TABLE ONLY public.alarma ALTER COLUMN id_alarm SET DEFAULT nextval('public.alarma_id_alarm_seq'::regclass);
 >   ALTER TABLE public.alarma ALTER COLUMN id_alarm DROP DEFAULT;
       public          postgres    false    200    201    201            ?           2604    24768    escolta id_esc    DEFAULT     p   ALTER TABLE ONLY public.escolta ALTER COLUMN id_esc SET DEFAULT nextval('public.escolta_id_esc_seq'::regclass);
 =   ALTER TABLE public.escolta ALTER COLUMN id_esc DROP DEFAULT;
       public          postgres    false    206    207    207            �          0    16574    alarma 
   TABLE DATA           L   COPY public.alarma (id_alarm, id_veci, id_guard, fecha, estado) FROM stdin;
    public          postgres    false    201   &       �          0    24765    escolta 
   TABLE DATA           i   COPY public.escolta (id_esc, id_veci, id_guard, fechahora, modalidad, estado_esc, ref_direc) FROM stdin;
    public          postgres    false    207   "&       �          0    16599    guardia 
   TABLE DATA           B   COPY public.guardia (id_guard, tipo, name_guard, rut) FROM stdin;
    public          postgres    false    204   ?&       �          0    16607    usuario_guardia 
   TABLE DATA           ?   COPY public.usuario_guardia (id_guard, pass_guard) FROM stdin;
    public          postgres    false    205   \&       �          0    16591    usuario_vecino 
   TABLE DATA           <   COPY public.usuario_vecino (id_veci, pass_veci) FROM stdin;
    public          postgres    false    203   y&       �          0    16583    vecino 
   TABLE DATA           v   COPY public.vecino (id_veci, direccion, name_contact, numb_contact, name_contact2, numb_contact2, estado) FROM stdin;
    public          postgres    false    202   �&       �           0    0    alarma_id_alarm_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.alarma_id_alarm_seq', 1, false);
          public          postgres    false    200            �           0    0    escolta_id_esc_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.escolta_id_esc_seq', 1, false);
          public          postgres    false    206            A           2606    16582    alarma alarma_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.alarma
    ADD CONSTRAINT alarma_pkey PRIMARY KEY (id_alarm);
 <   ALTER TABLE ONLY public.alarma DROP CONSTRAINT alarma_pkey;
       public            postgres    false    201            K           2606    24773    escolta escolta_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.escolta
    ADD CONSTRAINT escolta_pkey PRIMARY KEY (id_esc);
 >   ALTER TABLE ONLY public.escolta DROP CONSTRAINT escolta_pkey;
       public            postgres    false    207            G           2606    16606    guardia guardia_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.guardia
    ADD CONSTRAINT guardia_pkey PRIMARY KEY (id_guard);
 >   ALTER TABLE ONLY public.guardia DROP CONSTRAINT guardia_pkey;
       public            postgres    false    204            I           2606    16614 $   usuario_guardia usuario_guardia_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario_guardia
    ADD CONSTRAINT usuario_guardia_pkey PRIMARY KEY (id_guard);
 N   ALTER TABLE ONLY public.usuario_guardia DROP CONSTRAINT usuario_guardia_pkey;
       public            postgres    false    205            E           2606    16598 "   usuario_vecino usuario_vecino_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.usuario_vecino
    ADD CONSTRAINT usuario_vecino_pkey PRIMARY KEY (id_veci);
 L   ALTER TABLE ONLY public.usuario_vecino DROP CONSTRAINT usuario_vecino_pkey;
       public            postgres    false    203            C           2606    16590    vecino vecino_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.vecino
    ADD CONSTRAINT vecino_pkey PRIMARY KEY (id_veci);
 <   ALTER TABLE ONLY public.vecino DROP CONSTRAINT vecino_pkey;
       public            postgres    false    202            M           2606    16620    alarma alarma_id_guard_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.alarma
    ADD CONSTRAINT alarma_id_guard_fkey FOREIGN KEY (id_guard) REFERENCES public.guardia(id_guard) NOT VALID;
 E   ALTER TABLE ONLY public.alarma DROP CONSTRAINT alarma_id_guard_fkey;
       public          postgres    false    2887    201    204            L           2606    16615    alarma alarma_id_veci_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.alarma
    ADD CONSTRAINT alarma_id_veci_fkey FOREIGN KEY (id_veci) REFERENCES public.vecino(id_veci) NOT VALID;
 D   ALTER TABLE ONLY public.alarma DROP CONSTRAINT alarma_id_veci_fkey;
       public          postgres    false    201    2883    202            O           2606    24779    escolta escolta_id_guard_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.escolta
    ADD CONSTRAINT escolta_id_guard_fkey FOREIGN KEY (id_guard) REFERENCES public.guardia(id_guard);
 G   ALTER TABLE ONLY public.escolta DROP CONSTRAINT escolta_id_guard_fkey;
       public          postgres    false    2887    207    204            N           2606    24774    escolta escolta_id_veci_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.escolta
    ADD CONSTRAINT escolta_id_veci_fkey FOREIGN KEY (id_veci) REFERENCES public.vecino(id_veci);
 F   ALTER TABLE ONLY public.escolta DROP CONSTRAINT escolta_id_veci_fkey;
       public          postgres    false    2883    202    207            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x�I-.1�4426153����� 0��      �   @   x�I-.1�,�/VH,,��,N,.�N�45���0"μĢҒ|����q&&�d��s��qqq H�]     