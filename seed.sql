INSERT INTO
    travel (
        id,
        slug,
        name,
        description,
        numberOfDays,
        img,
        moods
    )
VALUES
    (
        'd408be33-aa6a-4c73-a2c8-58a70ab2ba4d',
        'jordan-360',
        'Jordan 360°',
        'Jordan 360°: the perfect tour to discover the suggestive Wadi Rum desert, the ancient beauty of Petra, and much more.\n\nVisiting Jordan is one of the most fascinating things that everyone has to do once in their life.You are probably wondering "Why?". Well, that\'s easy: because this country keeps several passions! During our tour in Jordan, you can range from well-preserved archaeological masterpieces to trekkings, from natural wonders excursions to ancient historical sites, from camels trek in the desert to some time to relax.\nDo not forget to float in the Dead Sea and enjoy mineral-rich mud baths, it\'s one of the most peculiar attractions. It will be a tour like no other: this beautiful country leaves a memorable impression on everyone.',
        8,
        'https://strapi-imaginary.weroad.it/resource/webp-icon/24161/viaggio-giordania-avventura-deserto-wadi-rum-novembre-autunno.webp',
        '{"nature": 80, "relax": 20, "history": 90, "culture": 30, "party": 10}'
    ),
    (
        '4f4bd032-e7d4-402a-bdf6-aaf6be240d53',
        'iceland-hunting-northern-lights',
        'Iceland: hunting for the Northern Lights',
        "Why visit Iceland in winter? Because it is between October and March that this land offers the spectacle of the Northern Lights, one of the most incredible and magical natural phenomena in the world, visible only near the earth's two magnetic poles. Come with us on WeRoad to explore this land of ice and fire, full of contrasts and natural variety, where the energy of waterfalls and geysers meets the peace of the fjords... And when the ribbons of light of the aurora borealis twinkle in the sky before our enchanted eyes, we will know that we have found what we were looking for.",
        8,
        'https://strapi-imaginary.weroad.it/resource/webp-icon/12846/viaggio-avventura-islanda-mondo-aurora-boreale-jpg.webp',
        '{"nature": 100, "relax": 30, "history": 10, "culture": 20, "party": 10}'
    ),
    (
        'cbf304ae-a335-43fa-9e56-811612dcb601',
        'united-arab-emirates',
        'United Arab Emirates: from Dubai to Abu Dhabi',
        'At Dubai and Abu Dhabi everything is huge and majestic: here futuristic engineering works and modern infrastructures meet historical districts, local souks (typical bazars), desert and the sea. In this tour we’ll discover Dubai, where we’ll get on top of the highest skyscraper ever built, the Burj Khalifa. We’ll then take a walk at the Dubai Mall, the biggest mall on the planet, and we’ll spend a night in the desert, with the sight of the skyline on the horizon keeping us company. Then, it will be Abu Dhabi’s tourn! Sheik Zayed’s Grand Mosque’s white marble awaits for us to remain stoked in front of its wonderfulness, and the sea will invade us with peacefulness. UAE are all to discover, we’ll just get a taste of it, but we guarantee you’ll get quite the idea!',
        7,
        'https://strapi-imaginary.weroad.it/resource/webp-icon/13624/viaggio-emirati-arabi-dubai.webp',
        '{"nature": 30, "relax": 40, "history": 20, "culture": 80, "party": 70}'
    );

INSERT INTO
    `tour` (
        `id`,
        `travelId`,
        `name`,
        `startingDate`,
        `endingDate`,
        `price`
    )
VALUES
    (
        "2a0edc99-c9fe-4206-8da5-413586667a21",
        "d408be33-aa6a-4c73-a2c8-58a70ab2ba4d",
        "ITJOR20211101",
        "2021-11-01",
        "2021-11-09",
        199900
    ),
    (
        "7f0ff8cc-6b19-407e-9915-279ad76c0b5c",
        "d408be33-aa6a-4c73-a2c8-58a70ab2ba4d",
        "ITJOR20211112",
        "2021-11-12",
        "2021-11-20",
        189900
    ),
    (
        "0be966b8-0a9b-4220-b9b2-e49d2cc0c2ab",
        "d408be33-aa6a-4c73-a2c8-58a70ab2ba4d",
        "ITJOR20211125",
        "2021-11-25",
        "2021-12-03",
        214900
    ),
    (
        "94682e59-cbbd-44f5-861f-fb06c0ce18da",
        "4f4bd032-e7d4-402a-bdf6-aaf6be240d53",
        "ITICE20211101",
        "2021-11-01",
        "2021-11-08",
        199900
    ),
    (
        "90155d92-01e5-4c4b-a5a8-e24011fa8418",
        "cbf304ae-a335-43fa-9e56-811612dcb601",
        "ITARA20211221",
        "2021-12-21",
        "2021-12-28",
        189900
    ),
    (
        "9cefe1bc-eeb7-4d6d-b572-8a7aea2688d1",
        "cbf304ae-a335-43fa-9e56-811612dcb601",
        "ITARA20211221",
        "2022-01-03",
        "2022-01-10",
        149900
    );


    