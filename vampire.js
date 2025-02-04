class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampire = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampire++;
    }
    return numberOfVampire;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
    for (let descendant of this.offspring) {
      if (descendant.vampireWithName(name))  {
        return descendant.vampireWithName(name);
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalDescendants = 0;
    for (const descendant of this.offspring) {
      totalDescendants++;
      totalDescendants += descendant.totalDescendents;
    }
    return totalDescendants;
  }
  

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millVampires = [];
    if (this.yearConverted > 1980) {
      millVampires.push(this);
    }
    for (const descendant of this.offspring) {
      millVampires = millVampires.concat(descendant.allMillennialVampires);
    }
    return millVampires
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  get ancestors() {
    let ancestors = [this];
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      ancestors.push(currentVampire);
    }
    return ancestors;
  }

  closestCommonAncestor(vampire) {
    for (let ancestor of this.ancestors) {
      if (vampire.ancestors.includes(ancestor)) {
        return ancestor;
      }
    }
  }
}

module.exports = Vampire;