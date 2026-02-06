-- 1. Tablas Maestras Independientes (Nivel 1)
CREATE SEQUENCE IF NOT EXISTS usuario_usuario_id_seq;
CREATE TABLE "public"."usuario" (
    "usuario_id" int4 NOT NULL DEFAULT nextval('usuario_usuario_id_seq'::regclass),
    "nombre" varchar(100) NOT NULL,
    "edad" int2 NOT NULL,
    "sexo" bpchar(1) NOT NULL,
    "peso_kg" numeric(5,2) NOT NULL,
    "altura_cm" numeric(5,2) NOT NULL,
    "nivel" varchar(20) NOT NULL,
    "condiciones_medicas" text,
    "objetivos" text,
    "created_at" timestamptz DEFAULT now(),
    "updated_at" timestamptz DEFAULT now(),
    "email" varchar(150) NOT NULL,
    "celular" varchar(20),
    "password_hash" varchar(255) NOT NULL,
    "refresh_token" varchar(500),
    "rol" varchar(50) NOT NULL DEFAULT 'usuario'::character varying,
    "habeas_data_aceptado" bool NOT NULL DEFAULT false,
    "fecha_habeas_data" timestamptz,
    "is_deleted" bool NOT NULL DEFAULT false,
    "deleted_at" timestamptz,
    "is_activo" bool,
    PRIMARY KEY ("usuario_id")
);
CREATE UNIQUE INDEX usuario_email_key ON public.usuario USING btree (email);

CREATE SEQUENCE IF NOT EXISTS equipamiento_equipamiento_id_seq;
CREATE TABLE "public"."equipamiento" (
    "equipamiento_id" int4 NOT NULL DEFAULT nextval('equipamiento_equipamiento_id_seq'::regclass),
    "descripcion" varchar(50) NOT NULL,
    PRIMARY KEY ("equipamiento_id")
);
CREATE UNIQUE INDEX equipamiento_descripcion_key ON public.equipamiento USING btree (descripcion);

CREATE SEQUENCE IF NOT EXISTS ejercicio_ejercicio_id_seq;
CREATE TABLE "public"."ejercicio" (
    "ejercicio_id" int4 NOT NULL DEFAULT nextval('ejercicio_ejercicio_id_seq'::regclass),
    "nombre" varchar(100) NOT NULL,
    "categoria" varchar(50),
    "musculo_principal" varchar(100),
    PRIMARY KEY ("ejercicio_id")
);

-- 2. Tablas Dependientes de Usuario y Ejercicio (Nivel 2)
CREATE SEQUENCE IF NOT EXISTS preferencia_preferencia_id_seq;
CREATE TABLE "public"."preferencia" (
    "preferencia_id" int4 NOT NULL DEFAULT nextval('preferencia_preferencia_id_seq'::regclass),
    "usuario_id" int4,
    "ejercicios_favoritos" text,
    "ejercicios_a_evitar" text,
    CONSTRAINT "preferencia_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuario"("usuario_id"),
    PRIMARY KEY ("preferencia_id")
);
CREATE UNIQUE INDEX preferencia_usuario_id_key ON public.preferencia USING btree (usuario_id);

CREATE SEQUENCE IF NOT EXISTS progreso_progreso_id_seq;
CREATE TABLE "public"."progreso" (
    "progreso_id" int4 NOT NULL DEFAULT nextval('progreso_progreso_id_seq'::regclass),
    "usuario_id" int4,
    "fecha" date DEFAULT CURRENT_DATE,
    "peso_kg" numeric(5,2),
    "medidas" jsonb,
    "notas" text,
    "created_at" timestamptz DEFAULT now(),
    CONSTRAINT "progreso_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuario"("usuario_id"),
    PRIMARY KEY ("progreso_id")
);

CREATE TABLE "public"."ejercicio_equipamiento" (
    "ejercicio_id" int4 NOT NULL,
    "equipamiento_id" int4 NOT NULL,
    CONSTRAINT "ejercicio_equipamiento_ejercicio_id_fkey" FOREIGN KEY ("ejercicio_id") REFERENCES "public"."ejercicio"("ejercicio_id"),
    CONSTRAINT "ejercicio_equipamiento_equipamiento_id_fkey" FOREIGN KEY ("equipamiento_id") REFERENCES "public"."equipamiento"("equipamiento_id"),
    PRIMARY KEY ("ejercicio_id","equipamiento_id")
);

CREATE SEQUENCE IF NOT EXISTS rutina_rutina_id_seq;
CREATE TABLE "public"."rutina" (
    "rutina_id" int4 NOT NULL DEFAULT nextval('rutina_rutina_id_seq'::regclass),
    "usuario_id" int4,
    "nombre" varchar(100),
    "fecha_creacion" date DEFAULT CURRENT_DATE,
    "tipo_division" varchar(50),
    CONSTRAINT "rutina_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuario"("usuario_id"),
    PRIMARY KEY ("rutina_id")
);

-- 3. Estructura de Rutina (Nivel 3)
CREATE SEQUENCE IF NOT EXISTS sesion_sesion_id_seq;
CREATE TABLE "public"."sesion" (
    "sesion_id" int4 NOT NULL DEFAULT nextval('sesion_sesion_id_seq'::regclass),
    "rutina_id" int4,
    "nombre" varchar(100),
    "dia_orden" int2,
    CONSTRAINT "sesion_rutina_id_fkey" FOREIGN KEY ("rutina_id") REFERENCES "public"."rutina"("rutina_id"),
    PRIMARY KEY ("sesion_id")
);
CREATE UNIQUE INDEX sesion_rutina_orden_uk ON public.sesion USING btree (rutina_id, dia_orden);

-- 4. Detalle de Sesión (Nivel 4)
CREATE SEQUENCE IF NOT EXISTS sesion_ejercicio_sesion_ejercicio_id_seq;
CREATE TABLE "public"."sesion_ejercicio" (
    "sesion_ejercicio_id" int4 NOT NULL DEFAULT nextval('sesion_ejercicio_sesion_ejercicio_id_seq'::regclass),
    "sesion_id" int4,
    "ejercicio_id" int4,
    "orden" int2,
    "series" int2,
    "repeticiones" int2,
    "descanso_seg" int2,
    CONSTRAINT "sesion_ejercicio_ejercicio_id_fkey" FOREIGN KEY ("ejercicio_id") REFERENCES "public"."ejercicio"("ejercicio_id"),
    CONSTRAINT "sesion_ejercicio_sesion_id_fkey" FOREIGN KEY ("sesion_id") REFERENCES "public"."sesion"("sesion_id"),
    PRIMARY KEY ("sesion_ejercicio_id")
);
CREATE UNIQUE INDEX sesion_ejercicio_orden_uk ON public.sesion_ejercicio USING btree (sesion_id, orden);

-- 5. Seguimiento (Nivel 5)
CREATE SEQUENCE IF NOT EXISTS registro_entrenamiento_registro_id_seq;
CREATE TABLE "public"."registro_entrenamiento" (
    "registro_id" int4 NOT NULL DEFAULT nextval('registro_entrenamiento_registro_id_seq'::regclass),
    "usuario_id" int4,
    "sesion_id" int4,
    "sesion_ejercicio_id" int4,
    "fecha" date DEFAULT CURRENT_DATE,
    "series_realizadas" int2,
    "repeticiones_realizadas" int2,
    "peso_utilizado_kg" numeric(6,2),
    CONSTRAINT "registro_entrenamiento_sesion_ejercicio_id_fkey" FOREIGN KEY ("sesion_ejercicio_id") REFERENCES "public"."sesion_ejercicio"("sesion_ejercicio_id"),
    CONSTRAINT "registro_entrenamiento_sesion_id_fkey" FOREIGN KEY ("sesion_id") REFERENCES "public"."sesion"("sesion_id"),
    CONSTRAINT "registro_entrenamiento_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuario"("usuario_id"),
    PRIMARY KEY ("registro_id")
);