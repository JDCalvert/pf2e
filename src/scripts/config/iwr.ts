const immunityTypes = {
    acid: "PF2E.Damage.RollFlavor.acid",
    adamantine: "PF2E.Damage.IWR.Type.adamantine",
    air: "PF2E.Damage.RollFlavor.air",
    "area-damage": "PF2E.Damage.IWR.Type.area-damage",
    auditory: "PF2E.Damage.IWR.Type.auditory",
    bleed: "PF2E.Damage.RollFlavor.bleed",
    blinded: "PF2E.Damage.IWR.Type.blinded",
    bludgeoning: "PF2E.Damage.RollFlavor.bludgeoning",
    chaotic: "PF2E.Damage.RollFlavor.chaotic",
    clumsy: "PF2E.Damage.IWR.Type.clumsy",
    cold: "PF2E.Damage.RollFlavor.cold",
    "cold-iron": "PF2E.Damage.IWR.Type.cold-iron",
    confused: "PF2E.Damage.IWR.Type.confused",
    conjuration: "PF2E.Damage.IWR.Type.conjuration",
    controlled: "PF2E.Damage.IWR.Type.controlled",
    "critical-hits": "PF2E.Damage.IWR.Type.critical-hits",
    curse: "PF2E.Damage.IWR.Type.curse",
    darkwood: "PF2E.Damage.IWR.Type.darkwood",
    dazzled: "PF2E.Damage.IWR.Type.dazzled",
    deafened: "PF2E.Damage.IWR.Type.deafened",
    "death-effects": "PF2E.Damage.IWR.Type.death-effects",
    disease: "PF2E.Damage.IWR.Type.disease",
    doomed: "PF2E.Damage.IWR.Type.doomed",
    drained: "PF2E.Damage.IWR.Type.drained",
    earth: "PF2E.Damage.RollFlavor.earth",
    electricity: "PF2E.Damage.RollFlavor.electricity",
    emotion: "PF2E.Damage.IWR.Type.emotion",
    enchantment: "PF2E.Damage.IWR.Type.enchantment",
    energy: "PF2E.Damage.IWR.Type.energy",
    enfeebled: "PF2E.Damage.IWR.Type.enfeebled",
    evil: "PF2E.Damage.RollFlavor.evil",
    evocation: "PF2E.Damage.IWR.Type.evocation",
    fascinated: "PF2E.Damage.IWR.Type.fascinated",
    fatigued: "PF2E.Damage.IWR.Type.fatigued",
    "fear-effects": "PF2E.Damage.IWR.Type.fear-effects",
    fire: "PF2E.Damage.RollFlavor.fire",
    "flat-footed": "PF2E.Damage.IWR.Type.flat-footed",
    fleeing: "PF2E.Damage.IWR.Type.fleeing",
    force: "PF2E.Damage.RollFlavor.force",
    frightened: "PF2E.Damage.IWR.Type.frightened",
    good: "PF2E.Damage.RollFlavor.good",
    grabbed: "PF2E.Damage.IWR.Type.grabbed",
    healing: "PF2E.Damage.IWR.Type.healing",
    illusion: "PF2E.Damage.IWR.Type.illusion",
    immobilized: "PF2E.Damage.IWR.Type.immobilized",
    inhaled: "PF2E.Damage.IWR.Type.inhaled",
    lawful: "PF2E.Damage.RollFlavor.lawful",
    light: "PF2E.Damage.IWR.Type.light",
    magic: "PF2E.Damage.IWR.Type.magic",
    mental: "PF2E.Damage.RollFlavor.mental",
    "misfortune-effects": "PF2E.Damage.IWR.Type.misfortune-effects",
    mithral: "PF2E.Damage.IWR.Type.mithral",
    necromancy: "PF2E.Damage.IWR.Type.necromancy",
    negative: "PF2E.Damage.RollFlavor.negative",
    "non-magical": "PF2E.Damage.IWR.Type.non-magical",
    "nonlethal-attacks": "PF2E.Damage.IWR.Type.nonlethal-attacks",
    "object-immunities": "PF2E.Damage.IWR.Type.object-immunities",
    olfactory: "PF2E.Damage.IWR.Type.olfactory",
    orichalcum: "PF2E.Damage.IWR.Type.orichalcum",
    paralyzed: "PF2E.Damage.IWR.Type.paralyzed",
    petrified: "PF2E.Damage.IWR.Type.petrified",
    physical: "PF2E.Damage.IWR.Type.physical",
    piercing: "PF2E.Damage.RollFlavor.piercing",
    poison: "PF2E.Damage.RollFlavor.poison",
    polymorph: "PF2E.Damage.IWR.Type.polymorph",
    positive: "PF2E.Damage.RollFlavor.positive",
    possession: "PF2E.Damage.IWR.Type.possession",
    precision: "PF2E.Damage.RollFlavor.precision",
    prone: "PF2E.Damage.IWR.Type.prone",
    restrained: "PF2E.Damage.IWR.Type.restrained",
    "salt-water": "PF2E.Damage.IWR.Type.salt-water",
    scrying: "PF2E.Damage.IWR.Type.scrying",
    sickened: "PF2E.Damage.IWR.Type.sickened",
    silver: "PF2E.Damage.IWR.Type.silver",
    slashing: "PF2E.Damage.RollFlavor.slashing",
    sleep: "PF2E.Damage.IWR.Type.sleep",
    slowed: "PF2E.Damage.IWR.Type.slowed",
    sonic: "PF2E.Damage.RollFlavor.sonic",
    "spell-deflection": "PF2E.Damage.IWR.Type.spell-deflection",
    stunned: "PF2E.Damage.IWR.Type.stunned",
    stupefied: "PF2E.Damage.IWR.Type.stupefied",
    "swarm-attacks": "PF2E.Damage.IWR.Type.swarm-attacks",
    "swarm-mind": "PF2E.Damage.IWR.Type.swarm-mind",
    transmutation: "PF2E.Damage.IWR.Type.transmutation",
    trip: "PF2E.Damage.IWR.Type.trip",
    "unarmed-attacks": "PF2E.Damage.IWR.Type.unarmed-attacks",
    unconscious: "PF2E.Damage.IWR.Type.unconscious",
    visual: "PF2E.Damage.IWR.Type.visual",
    water: "PF2E.Damage.IWR.Type.water",
};

const weaknessTypes = {
    acid: "PF2E.Damage.RollFlavor.acid",
    adamantine: "PF2E.Damage.IWR.Type.adamantine",
    air: "PF2E.Damage.RollFlavor.air",
    "area-damage": "PF2E.Damage.IWR.Type.area-damage",
    "arrow-vulnerability": "PF2E.Damage.IWR.Type.arrow-vulnerability",
    "axe-vulnerability": "PF2E.Damage.IWR.Type.axe-vulnerability",
    bleed: "PF2E.Damage.RollFlavor.bleed",
    bludgeoning: "PF2E.Damage.RollFlavor.bludgeoning",
    chaotic: "PF2E.Damage.RollFlavor.chaotic",
    cold: "PF2E.Damage.RollFlavor.cold",
    "cold-iron": "PF2E.Damage.IWR.Type.cold-iron",
    "critical-hits": "PF2E.Damage.IWR.Type.critical-hits",
    darkwood: "PF2E.Damage.IWR.Type.darkwood",
    earth: "PF2E.Damage.RollFlavor.earth",
    electricity: "PF2E.Damage.RollFlavor.electricity",
    emotion: "PF2E.Damage.IWR.Type.emotion",
    energy: "PF2E.Damage.IWR.Type.energy",
    evil: "PF2E.Damage.RollFlavor.evil",
    fire: "PF2E.Damage.RollFlavor.fire",
    force: "PF2E.Damage.RollFlavor.force",
    "ghost-touch": "PF2E.Damage.IWR.Type.ghost-touch",
    good: "PF2E.Damage.RollFlavor.good",
    lawful: "PF2E.Damage.RollFlavor.lawful",
    light: "PF2E.Damage.IWR.Type.light",
    magical: "PF2E.Damage.IWR.Type.magical",
    mental: "PF2E.Damage.RollFlavor.mental",
    metal: "PF2E.Damage.RollFlavor.metal",
    mithral: "PF2E.Damage.IWR.Type.mithral",
    negative: "PF2E.Damage.RollFlavor.negative",
    "non-magical": "PF2E.Damage.IWR.Type.non-magical",
    "nonlethal-attacks": "PF2E.Damage.IWR.Type.nonlethal-attacks",
    orichalcum: "PF2E.Damage.IWR.Type.orichalcum",
    physical: "PF2E.Damage.IWR.Type.physical",
    piercing: "PF2E.Damage.RollFlavor.piercing",
    poison: "PF2E.Damage.RollFlavor.poison",
    positive: "PF2E.Damage.RollFlavor.positive",
    precision: "PF2E.Damage.RollFlavor.precision",
    radiation: "PF2E.Damage.IWR.Type.radiation",
    salt: "PF2E.Damage.IWR.Type.salt",
    "salt-water": "PF2E.Damage.IWR.Type.salt-water",
    silver: "PF2E.Damage.IWR.Type.silver",
    slashing: "PF2E.Damage.RollFlavor.slashing",
    sonic: "PF2E.Damage.RollFlavor.sonic",
    "splash-damage": "PF2E.Damage.IWR.Type.splash-damage",
    "unarmed-attacks": "PF2E.Damage.IWR.Type.unarmed-attacks",
    "vampire-weaknesses": "PF2E.Damage.IWR.Type.vampire-weaknesses",
    vorpal: "PF2E.Damage.IWR.Type.vorpal",
    "vorpal-fear": "PF2E.Damage.IWR.Type.vorpal-fear",
    "vulnerable-to-sunlight": "PF2E.Damage.IWR.Type.vulnerable-to-sunlight",
    warpglass: "PF2E.Damage.IWR.Type.warpglass",
    water: "PF2E.Damage.IWR.Type.water",
    weapons: "PF2E.Damage.IWR.Type.weapons",
    "weapons-shedding-bright-light": "PF2E.Damage.IWR.Type.weapons-shedding-bright-light",
};

const resistanceTypes = {
    acid: "PF2E.Damage.RollFlavor.acid",
    adamantine: "PF2E.Damage.IWR.Type.adamantine",
    air: "PF2E.Damage.RollFlavor.air",
    "all-damage": "PF2E.Damage.IWR.Type.all-damage",
    "area-damage": "PF2E.Damage.IWR.Type.area-damage",
    bleed: "PF2E.Damage.RollFlavor.bleed",
    bludgeoning: "PF2E.Damage.RollFlavor.bludgeoning",
    chaotic: "PF2E.Damage.RollFlavor.chaotic",
    cold: "PF2E.Damage.RollFlavor.cold",
    "cold-iron": "PF2E.Damage.IWR.Type.cold-iron",
    "critical-hits": "PF2E.Damage.IWR.Type.critical-hits",
    "damage-from-spells": "PF2E.Damage.IWR.Type.damage-from-spells",
    darkwood: "PF2E.Damage.IWR.Type.darkwood",
    earth: "PF2E.Damage.RollFlavor.earth",
    electricity: "PF2E.Damage.RollFlavor.electricity",
    energy: "PF2E.Damage.IWR.Type.energy",
    evil: "PF2E.Damage.RollFlavor.evil",
    fire: "PF2E.Damage.RollFlavor.fire",
    force: "PF2E.Damage.RollFlavor.force",
    "ghost-touch": "PF2E.Damage.IWR.Type.ghost-touch",
    good: "PF2E.Damage.RollFlavor.good",
    lawful: "PF2E.Damage.RollFlavor.lawful",
    light: "PF2E.Damage.IWR.Type.light",
    magical: "PF2E.Damage.IWR.Type.magical",
    mental: "PF2E.Damage.RollFlavor.mental",
    metal: "PF2E.Damage.RollFlavor.metal",
    mithral: "PF2E.Damage.IWR.Type.mithral",
    negative: "PF2E.Damage.RollFlavor.negative",
    "non-magical": "PF2E.Damage.IWR.Type.non-magical",
    nonlethal: "PF2E.Damage.IWR.Type.nonlethal",
    "nonlethal-attacks": "PF2E.Damage.IWR.Type.nonlethal-attacks",
    orichalcum: "PF2E.Damage.IWR.Type.orichalcum",
    physical: "PF2E.Damage.IWR.Type.physical",
    piercing: "PF2E.Damage.RollFlavor.piercing",
    plant: "PF2E.Damage.IWR.Type.plant",
    poison: "PF2E.Damage.RollFlavor.poison",
    positive: "PF2E.Damage.RollFlavor.positive",
    precision: "PF2E.Damage.RollFlavor.precision",
    "protean-anatomy": "PF2E.Damage.IWR.Type.protean-anatomy",
    radiation: "PF2E.Damage.IWR.Type.radiation",
    salt: "PF2E.Damage.IWR.Type.salt",
    "salt-water": "PF2E.Damage.IWR.Type.salt-water",
    silver: "PF2E.Damage.IWR.Type.silver",
    slashing: "PF2E.Damage.RollFlavor.slashing",
    sonic: "PF2E.Damage.RollFlavor.sonic",
    "unarmed-attacks": "PF2E.Damage.IWR.Type.unarmed-attacks",
    vorpal: "PF2E.Damage.IWR.Type.vorpal",
    "vorpal-adamantine": "PF2E.Damage.IWR.Type.vorpal-adamantine",
    warpglass: "PF2E.Damage.IWR.Type.warpglass",
    water: "PF2E.Damage.IWR.Type.water",
    weapons: "PF2E.Damage.IWR.Type.weapons",
    "weapons-shedding-bright-light": "PF2E.Damage.IWR.Type.weapons-shedding-bright-light",
};

export { immunityTypes, weaknessTypes, resistanceTypes };
