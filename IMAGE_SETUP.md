# 🖼️ Flashcard Image Setup Guide

The app auto-detects images saved to `public/images/decks/{deckId}/{english-name}.{ext}`. Name files by the **English word** (e.g. `dog.jpg`, `cat.jpg`) — not by card numbers.

When an image exists, it displays on the card. When it doesn't, the card shows emoji only — no errors.

---

## 📁 Folder Structure

```
public/images/decks/
├── animals/
│   ├── dog.jpg           (ឆ្កែ — Dog)
│   ├── cat.jpg           (ឆ្មា — Cat)
│   ├── cow.jpg           (គោ — Cow)
│   ├── pig.jpg           (ជ្រូក — Pig)
│   ├── chicken.jpg       (មាន់ — Chicken)
│   ├── fish.jpg          (ត្រី — Fish)
│   ├── elephant.jpg      (ដំរី — Elephant)
│   ├── horse.jpg         (សេះ — Horse)
│   ├── monkey.jpg        (ស្វា — Monkey)
│   ├── tiger.jpg         (ខ្លា — Tiger)
│   ├── mouse.jpg         (កណ្តុរ — Mouse)
│   └── bird.jpg          (សត្វស្លាប — Bird)
├── body-parts/
│   ├── head.jpg          (ក្បាល — Head)
│   ├── eye.jpg           (ភ្នែក — Eye)
│   ├── nose.jpg          (ច្រមុះ — Nose)
│   ├── mouth.jpg         (មាត់ — Mouth)
│   ├── ear.jpg           (ត្រចៀក — Ear)
│       ├── hand-arm.jpg      (ដៃ — Hand / Arm)
│       ├── leg-foot.jpg      (ជើង — Leg / Foot)
│   └── hair.jpg          (សក់ — Hair)
├── buildings/
│   ├── house.jpg         (ផ្ទះ — House)
│   ├── school.jpg        (សាលារៀន — School)
│   ├── hospital.jpg      (មន្ទីរពេទ្យ — Hospital)
│   ├── market.jpg        (ផ្សារ — Market)
│   ├── temple.jpg        (វត្ត — Temple)
│   ├── bank.jpg          (ធនាគារ — Bank)
│   ├── restaurant.jpg    (ភោជនីយដ្ឋាន — Restaurant)
│   ├── hotel.jpg         (សណ្ឋាគារ — Hotel)
│   ├── police-station.jpg(ប៉ុស្តិ៍នគរបាល — Police station)
│   └── airport.jpg       (ព្រលានយន្តហោះ — Airport)
├── colors/
│   ├── red.jpg           (ក្រហម — Red)
│   ├── yellow.jpg        (លឿង — Yellow)
│   ├── blue.jpg          (ខៀវ — Blue)
│   ├── green.jpg         (បៃតង — Green)
│   ├── white.jpg         (ស — White)
│   ├── black.jpg         (ខ្មៅ — Black)
│   ├── brown.jpg         (ត្នោត — Brown)
│   ├── purple.jpg        (ស្វាយ — Purple)
│   └── orange.jpg        (ទឹកក្រូច — Orange)
├── daily-items/
│   ├── phone.jpg         (ទូរស័ព្ទ — Phone)
│   ├── book.jpg          (សៀវភៅ — Book)
│   ├── pen.jpg           (ប៊ិក — Pen)
│   ├── pencil.jpg        (ខ្មៅដៃ — Pencil)
│   ├── table.jpg         (តុ — Table)
│   ├── chair.jpg         (កៅអី — Chair)
│   ├── bag.jpg           (កាបូប — Bag)
│   ├── key.jpg           (កូនសោ — Key)
│   ├── clock---watch.jpg (នាឡិកា — Clock / Watch)
│   ├── money.jpg         (លុយ — Money)
│   ├── clothes.jpg       (ខោអាវ — Clothes)
│   └── paper.jpg         (ក្រដាស — Paper)
├── family/
│   ├── mother.jpg        (ម៉ែ — Mother)
│   ├── father.jpg        (ប៉ា — Father)
│   ├── older-brother.jpg (បងប្រុស — Older brother)
│   ├── older-sister.jpg  (បងស្រី — Older sister)
│   ├── younger-brother.jpg(ប្អូនប្រុស — Younger brother)
│   ├── younger-sister.jpg(ប្អូនស្រី — Younger sister)
│   ├── grandfather.jpg   (តា — Grandfather)
│   └── grandmother.jpg   (យាយ — Grandmother)
├── food/
│   ├── rice---food.jpg   (បាយ — Rice / Food)
│   ├── water.jpg         (ទឹក — Water)
│   ├── meat.jpg          (សាច់ — Meat)
│   ├── fish.jpg          (ត្រី — Fish)
│   ├── vegetables.jpg    (បន្លែ — Vegetables)
│   ├── fruit.jpg         (ផ្លែឈើ — Fruit)
│   ├── soup.jpg          (ស៊ុប — Soup)
│   ├── milk.jpg          (ទឹកដោះគោ — Milk)
│   ├── sugar.jpg         (ស្ករ — Sugar)
│   └── bread.jpg         (នំបុ័ង — Bread)
├── relatives/
│   ├── uncle--younger-than-parent.jpg (ពូ — Uncle)
│   ├── aunt--younger-than-parent.jpg  (មីង — Aunt)
│   ├── uncle-aunt--older-than-parent.jpg (អ៊ំ — Older Uncle/Aunt)
│   ├── nephew---niece.jpg  (ក្មួយ — Nephew / Niece)
│   ├── cousin.jpg          (ជីដូនមួយ — Cousin)
│   ├── grandchild.jpg      (ចៅ — Grandchild)
│   ├── husband.jpg         (ប្តី — Husband)
│   ├── wife.jpg            (ប្រពន្ធ — Wife)
│   ├── son.jpg             (កូនប្រុស — Son)
│   └── daughter.jpg        (កូនស្រី — Daughter)
└── solar-system/
    ├── sun.jpg              (ព្រះអាទិត្យ — Sun)
    ├── moon.jpg             (ព្រះច័ន្ទ — Moon)
    ├── mercury.jpg          (ភពពុធ — Mercury)
    ├── venus.jpg            (ភពសុក្រ — Venus)
    ├── earth.jpg            (ភពផែនដី — Earth)
    ├── mars.jpg             (ភពអង្គារ — Mars)
    ├── jupiter.jpg          (ភពព្រហស្បតិ៍ — Jupiter)
    ├── saturn.jpg           (ភពសៅរ៍ — Saturn)
    ├── uranus.jpg           (ភពអ៊ុយរ៉ានុស — Uranus)
    └── neptune.jpg          (ភពណិបទូន — Neptune)
```

---

## 📛 Naming Rules

| Rule | Example |
|------|---------|
| **Use the English word** (lowercase) | `dog.jpg`, `cat.jpg` |
| **Spaces become dashes** | `police-station.jpg` |
| **Forward slashes become dashes** | `hand---arm.jpg` for "Hand / Arm" |
| Any extension works | `.png` · `.jpg` · `.jpeg` · `.webp` |
| Square aspect ratio | 400×400 px recommended |

> **Tip:** Don't know what filename to use? Open the deck file in `src/data/decks/`, look at the `english` field, and slugify it: lowercase + dashes.

---

## 🧠 Generating Images with Gemini

### Prompt Template

```
Generate a kid-friendly, colorful illustration of [subject].
Style: Flat cartoon, bright colors, white or light background,
simple shapes, suitable for children aged 3-10.
No text. Square aspect ratio.
```

### Batch Prompt Example

Send **one prompt per deck** to Gemini for all cards at once:

```
Generate square cartoon illustrations on white background,
kids style, flat colors, no text, for each subject:

animals: dog, cat, cow, pig, chicken, fish, elephant, horse, monkey, tiger, mouse, bird
```

Download each result, rename to the English name (e.g. `dog.jpg`), and save to the deck's folder.

---

## 📥 Step-by-Step Workflow

1. Pick a deck (start small — **Colors** has only 9 cards)
2. Send a batch prompt to Gemini
3. Download each image
4. Rename to the English name (e.g. `red.jpg`, `blue.jpg`, `green.jpg`, ...)
5. Save to `public/images/decks/colors/`
6. Restart dev server (`npm run dev`) and hard-refresh browser

### Verify

```bash
ls public/images/decks/colors/
# Should show: red.jpg  yellow.jpg  blue.jpg  green.jpg ...
```

Open the app → pick Colors → each card should show its image.

---

## 🚫 No Image? No Problem

Missing images are handled silently — the card simply shows the emoji instead. You can add images one deck at a time, or skip decks entirely.

---

## 📝 Quick Reference

| Deck | Folder | Cards |
|------|--------|-------|
| Animals | `public/images/decks/animals/` | 12 |
| Body Parts | `public/images/decks/body-parts/` | 8 |
| Buildings | `public/images/decks/buildings/` | 10 |
| Colors | `public/images/decks/colors/` | 9 |
| Daily Items | `public/images/decks/daily-items/` | 12 |
| Family | `public/images/decks/family/` | 8 |
| Food | `public/images/decks/food/` | 10 |
| Relatives | `public/images/decks/relatives/` | 10 |
| Solar System | `public/images/decks/solar-system/` | 10 |
| **Total** | | **89 images** |
