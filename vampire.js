class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

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
    let currentVampire = this;
    return getNumOfAncestors(currentVampire);
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const currentNumOfAncestors = getNumOfAncestors(this);
    const otherNumOfAncestors = getNumOfAncestors(vampire);

    if (currentNumOfAncestors < otherNumOfAncestors) {
      return true;
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    const currentVampArray = [];
    const otherVampArray = [];
    let currentVampire = this;

    if (currentVampire === vampire) {
      return currentVampire;
    } else if (currentVampire === vampire.creator || currentVampire.creator === null) {
      return currentVampire;
    } else if (vampire === currentVampire.creator || vampire.creator === null) {
      return vampire;
    }
    
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      currentVampArray.push(currentVampire);
    }

    while (vampire.creator) {
      vampire = vampire.creator;
      otherVampArray.push(vampire);
    }

    for (const vamp of currentVampArray) {
      for (const vamp2 of otherVampArray) {
        if (vamp === vamp2) {
          return vamp;
        }
      }
    }
  }
}

const getNumOfAncestors = (vampire) => {
  let numOfAncestors = 0;
  let parent = vampire.creator;

  while (parent) {
    numOfAncestors++;
    parent = parent.creator;
  }
  return numOfAncestors;
};

module.exports = Vampire;