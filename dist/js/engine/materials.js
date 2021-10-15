import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';

const textureLoader = new THREE.TextureLoader();


function loadTextures( folderName ) {

  const albedo = textureLoader.load(
    `/assets/${ folderName }/albedo.png`,
  );

  const ao = textureLoader.load(
    `/assets/${ folderName }/ao.png`,
  );

  const height = textureLoader.load(
    `/assets/${ folderName }/height.png`,
  );

  const metallic = textureLoader.load(
    `/assets/${ folderName }/metallic.png`,
  );

  const normal = textureLoader.load(
    `/assets/${ folderName }/normal.png`,
  );

  const roughness = textureLoader.load(
    `/assets/${ folderName }/roughness.png`,
  );


  return {
    map: albedo,
    aoMap: ao,
    bumpMap: height,
    metalnessMap: metallic,
    normalMap: normal,
    roughnessMap: roughness    
  }
}


// Loaded textures

// Wood
/* const cherryWoodTextures = loadTextures( "cherry-wood" ) */

// Concrete and cement
const linedCementTextures = loadTextures( "lined-cement" )
/* const patchyCementTextures = loadTextures( "patchy-cement" )
const concreteOneTextures = loadTextures( "concrete-1" )
const concreteTwoTextures = loadTextures( "concrete-2" )
const concreteThreeTextures = loadTextures( "concrete-3" ) */

// Marble
/* const stringyMarbleTextures = loadTextures( "stringy-marble" )
const streakedMarbleTextures = loadTextures( "streaked-marble" ) */
const speckledMarbleTextures = loadTextures( "speckled-marble" )

// Stone
const fleshyGraniteTextures = loadTextures( "fleshy-granite" )
/* const waterWornStoneTextures = loadTextures( "water-worn-stone" )
const markedLimestoneTextures = loadTextures( "marked-limestone" )
const flakingLimestoneTextures = loadTextures( "flaking-limestone" ) */


//


function createMaterialFieldWhite() {

  return new THREE.MeshPhysicalMaterial({
    ...linedCementTextures, 
    clearcoat: 0.5, 
    clearcoatRoughness: 1, 
    color: 0x555555 
  });

}

function createMaterialFieldBlack() {

   return new THREE.MeshPhysicalMaterial({ 
     ...linedCementTextures, 
     clearcoat: 0.5, 
     clearcoatRoughness: 1, 
    });

}2
function createMaterialFigureWhite() {

  return new THREE.MeshPhysicalMaterial({ 
    ...speckledMarbleTextures, 
    clearcoat: 0.2, 
    clearcoatRoughness: 1,  
  });

}

function createMaterialFigureBlack() {

   return new THREE.MeshPhysicalMaterial({ 
     ...fleshyGraniteTextures, 
     clearcoat: 0.2, 
     clearcoatRoughness: 1,  
    });

}


export { createMaterialFieldWhite, createMaterialFieldBlack, createMaterialFigureWhite, createMaterialFigureBlack };
