export const customerQuery = `
      CREATE TABLE IF NOT EXISTS Customer (
          CustomerId TEXT,
          CompanyName TEXT,
          ContactName TEXT,
          Address TEXT,
          City TEXT,
          Region TEXT,
          PostalCode TEXT,
          Country TEXT,
          Phone TEXT,
          PRIMARY KEY(CustomerId)
      )
    `;
export const productsQuery = `
     CREATE TABLE IF NOT EXISTS Product (
        ProductId TEXT,
        ProductName TEXT,
        Description TEXT,
        UnitPrice NUMERIC,
        PRIMARY KEY(ProductId)
     )
    `;

export const ordersQuery = `
     CREATE TABLE IF NOT EXISTS Order (
        OrderId INTEGER  PRIMARY KEY AUTOINCREMENT,
        CustomerId TEXT,
        OrderDate TEXT,
        ShippingDate TEXT,
        ShippingName TEXT,
        ShippingAddress TEXT,
        ShippingCity TEXT,
        ShippingRegion TEXT,
        ShippingPostalCode TEXT,
        ShippingCountry TEXT,
        ShippingPhone TEXT
     )
    `;

export const orderDetailsQuery = `
     CREATE TABLE IF NOT EXISTS DetailOrder (
        DetailOrderId INTEGER  PRIMARY KEY AUTOINCREMENT,
        OrderId INTEGER,
        ProductId TEXT,
        UnitPrice NUMERIC,
        Quantity INTEGER
     )
    `;

export const seedCustomerQuery = `
        INSERT INTO Customer
          (CustomerId
          ,CompanyName
          ,ContactName
          ,Address
          ,City
          ,Region
          ,PostalCode
          ,Country
          ,Phone)
        VALUES
        ('CL00001', 'La récrée des petits bouts', 'TAUREAU', '27 rue des fleurs',
        'CHARTRES', 'EURE-ET-LOIR', '28000', 'FR', null),
        ('CL00002', 'TARDIEU Antoinette', null, '11 Avenue du coin du bois', 'BOISEMONT',
        'VAL-D OISE', '95000', 'FR', null),
        ('CL00003', 'RAVIN Odile', null, '5 rue Mond', 'BOBIGNY', 'SEINE-ST-DENIS', '93000',
        'FR', null),
        ('CL00004', 'CRECHE LES LUTINS', 'TONGSAVARN', '44 rue Turenne', 'GRENOBLE', 'ISERE',
        '38000', 'FR', null),
        ('CL00005', 'LUDOTHEQUE ODYSSEE', 'VOEGEL', '35 rue Marbeuf', 'GRENOBLE', 'ISERE',
        '38000', 'FR', null),
        ('CL00006', 'IKEO', 'PLESSIS', '2 rue Gloxin', 'STRASBOURG', 'BAS-RHIN', '67000',
        'FR', null),
        ('CL00007', 'LUDO CLUB', 'ROUSSEAU', '13 rue source', 'MOLSHEIM', 'BAS-RHIN', '67120',
        'FR', null),
        ('CL00008', 'MOREL', 'MOREL', '128 route Guillon', 'COUBLEVIE', 'ISERE', '38500',
        'FR', null)
        `;

export const seedProdductQuery = `
        INSERT INTO Product
          (ProductId
          ,ProductName
          ,Description
          ,UnitPrice)
        VALUES
        ('ANIM0001', 'ANIMATEUR/ANIMATRICE', 'ANIMATEUR/ANIMATRICE POUR LA 
        JOURNEE', 162.00),
        ('ANIM0002', 'ASSISTANT/ASSISTANTE', 'ASSISTANT/ASSISTANTE POUR LA JOURNEE', 62.71),
        ('ANIM0003', 'MAGICIEN', 'MAGICIEN POUR LA JOURNEE', 365.80),
        ('ANIM0004', 'PERE NOEL', 'PERE NOEL POUR LA JOURNEE', 209.03),
        ('ANIM0005', 'MASCOTTE', 'MASCOTTE POUR LA JOURNEE', 62.71),
        ('ANIM0006', 'CLOWNS', 'CLOWNS POUR LA JOURNEE', 313.55),
        ('ATEL0001', 'ATELIER CREATION', 'ATELIER CREATION', 31.35),
        ('ATEL0002', 'ATELIER BRICOLAGE', 'ATELIER BRICOLAGE', 31.35),
        ('ATEL0003', 'ATELIER CUISINE', 'ATELIER CUISINE', 31.35),
        ('ATEL0004', 'ATELIER SCULPTURE SUR BALLONS', 'ATELIER SCULPTURE SUR BALLONS', 31.35),
        ('ATTA0001', 'ATTACHE-TETINE COEURS', 'ATTACHE-TETINE COEURS', 9.11),
        ('AU0Z0001', 'AU ZOO AVEC HECTOR LIVRE DE 3 A 6 ANS', 'AU ZOO AVEC HECTOR LIVRE DE 3 A 
        6 ANS', 7.82),
        ('AVIO0001', 'AVIONS TELECOMMANDES', 'AVIONS TELECOMMANDES', 55.18),
        ('BARB0001', 'SET GLADIATEUR', 'SET GLADIATEUR', 14.26),
        ('BARB0002', 'COFFRET BOUTIQUE MODE', 'COFFRET BOUTIQUE MODE', 22.90),
        ('BARB0003', 'POUPEE FASHION', 'POUPEE FASHION', 12.78)

        `;