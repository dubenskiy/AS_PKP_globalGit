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
  VID_CONT      SMALLINT     NOT NULL,
  MASSA_BR      SMALLINT    NOT NULL,
  TECH_SOST     SMALLINT    NOT NULL,
  DATE_PER      DATE        NOT NULL WITH DEFAULT '0001-01-01',
  TEK_GOD_PEREP CHAR(4)
) IN LKMCDB03.LKMCTS27;


CREATE UNIQUE INDEX LKMC.PRP_MAIN_NCONT
  ON LKMC.PRP_MAIN (NCONT);