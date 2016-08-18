CREATE TABLESPACE LKMCTS27
IN LKMCDB03
  USING STOGROUP LKMCSG00
PRIQTY 1283000 SECQTY 128300
BUFFERPOOL BP45;

CREATE TABLE LKMC.PRP_MAIN (
  NCONT         CHAR(11)    NOT NULL,
  PR_ABD        SMALLINT    NOT NULL,
  KOD_SOB       SMALLINT    NOT NULL,
  ST_OP         INTEGER     NOT NULL,
  DAT_OP        TIMESTAMP   NOT NULL WITH DEFAULT '0001-01-01-00.00.00.000000',
  IND_P         VARCHAR(15) NOT NULL,
  NINV          INT         NOT NULL,
  KOD_SOOB      CHAR(4)     NOT NULL,
  KOD_OP        SMALLINT    NOT NULL,
  PR_NEPR       SMALLINT    NOT NULL,
  DOR_PER       SMALLINT    NOT NULL,
  DOR_PR        SMALLINT    NOT NULL,
  DOR_PEREP     SMALLINT    NOT NULL,
  MESTO_PEREP   SMALLINT    NOT NULL,
  TIP_PEREP     SMALLINT    NOT NULL,
  NOM_PARK      SMALLINT    NOT NULL,
  NOM_PUT       SMALLINT    NOT NULL,
  TIP_RAZM      CHAR(4)     NOT NULL,
  VID_CONT      SMALLINT    NOT NULL,
  MASSA_BR      SMALLINT    NOT NULL,
  TECH_SOST     SMALLINT    NOT NULL,
  DATE_PER      DATE        NOT NULL WITH DEFAULT '0001-01-01',
  TEK_GOD_PEREP CHAR(4)
) IN LKMCDB03.LKMCTS27;


CREATE UNIQUE INDEX LKMC.PRP_MAIN_NCONT
  ON LKMC.PRP_MAIN (NCONT);

CREATE TABLESPACE LKMCTS28
IN LKMCDB03
  USING STOGROUP LKMCSG00
PRIQTY 820640 SECQTY 82064
BUFFERPOOL BP45;

CREATE TABLE LKMC.PRP_IBMU
(
  NCONT           CHAR(11)                                       NOT NULL,
  PR_ABD          SMALLINT                                       NOT NULL,
  KOD_SOB         SMALLINT                                       NOT NULL,
  ST_OP           INT                                            NOT NULL,
  DAT_OP          TIMESTAMP DEFAULT '0001-01-01-00.00.00.000000' NOT NULL,
  IND_P           VARCHAR(13)                                    NOT NULL,
  NINV            INT                                            NOT NULL,
  KOD_SOOB        VARCHAR(4)                                     NOT NULL,
  KOD_OP          SMALLINT                                       NOT NULL,
  PR_NEPR         CHAR(1)                                        NOT NULL,
  DOR_PER         SMALLINT                                       NOT NULL,
  DOR_PR          SMALLINT                                       NOT NULL,
  STR_OTPRV       SMALLINT                                       NOT NULL,
  STR_NAZN        SMALLINT                                       NOT NULL,
  STAN_POGR_OTPRK INT                                            NOT NULL,
  STAN_NAZN_OTPRK INT                                            NOT NULL,
  NOM_PPV         INT                                            NOT NULL
) IN LKMCDB03.LKMCTS28;

CREATE INDEX LKMC.PRP_IBMU_NCONT
  ON LKMC.PRP_IBMU (NCONT);

CREATE TABLESPACE LKMCTS29
IN LKMCDB03
  USING STOGROUP LKMCSG00
PRIQTY -1 SECQTY -1
BUFFERPOOL BP45;

CREATE TABLE LKMC.PRP_SVERKA2
(
  NCONT       CHAR(11) NOT NULL,
  REVISE_PRIZ CHAR(1)  NOT NULL
) IN LKMCDB03.LKMCTS29;

CREATE INDEX LKMC.PRP_SVERKA2_NCONT
  ON LKMC.PRP_SVERKA2 (NCONT);

CREATE TABLESPACE LKMCTS30
IN LKMCDB03
  USING STOGROUP LKMCSG00
PRIQTY 772400 SECQTY 77240
BUFFERPOOL BP45;

CREATE TABLE LKMC.PRP_SVERKA1
(
  NOM_KON         CHAR(11)                                       NOT NULL,
  KDS             VARCHAR(4)                                     NOT NULL,
  KOP_KMD         SMALLINT                                       NOT NULL,
  DATE_OP         TIMESTAMP DEFAULT '0001-01-01-00.00.00.000000' NOT NULL,
  STAN_OP         INT                                            NOT NULL,
  DOR_SDACH       SMALLINT                                       NOT NULL,
  DOR_DIS         SMALLINT                                       NOT NULL,
  NOM_VAG         INT                                            NOT NULL,
  INDEX_POEZD     VARCHAR(15)                                    NOT NULL,
  NOM_POEZD       INT                                            NOT NULL,
  STR_OTPRV       SMALLINT                                       NOT NULL,
  STR_NAZN        SMALLINT                                       NOT NULL,
  STAN_POGR_OTPRK INT                                            NOT NULL,
  STAN_NAZN_OTPRK INT                                            NOT NULL,
  PRIZ_REZ_SVER1  CHAR(1)                                        NOT NULL,
  PRIZ_REZ_SVER2  CHAR(1)                                        NOT NULL
) IN LKMCDB03.LKMCTS30;

CREATE INDEX LKMC.PRP_SVERKA1_NOM_KON
  ON LKMC.PRP_SVERKA1(NOM_KON);

