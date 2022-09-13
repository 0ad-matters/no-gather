var treeReductionMultiplier = 0.3;

/**
 * Create huntable animals.
 */
function addAnimals(constraint, size, deviation, fill)
{
	return;
}

function addBerries(constraint, size, deviation, fill)
{
	return;
}

function addFish(constraint, size, deviation, fill)
{
	return;
}

function addForests(constraint, size, deviation, fill)
{
	if (currentBiome() == "generic/savanna")
		return;

	g_Map.log("Creating forests");

	let treeTypes = [
		[
			g_Terrains.forestFloor2 + TERRAIN_SEPARATOR + g_Gaia.tree1,
			g_Terrains.forestFloor2 + TERRAIN_SEPARATOR + g_Gaia.tree2,
			g_Terrains.forestFloor2
		],
		[
			g_Terrains.forestFloor1 + TERRAIN_SEPARATOR + g_Gaia.tree4,
			g_Terrains.forestFloor1 + TERRAIN_SEPARATOR + g_Gaia.tree5,
			g_Terrains.forestFloor1
		]
	];

	let forestTypes = [
		[
			[g_Terrains.forestFloor2, g_Terrains.mainTerrain, treeTypes[0]],
			[g_Terrains.forestFloor2, treeTypes[0]]
		],
		[
			[g_Terrains.forestFloor2, g_Terrains.mainTerrain, treeTypes[1]],
			[g_Terrains.forestFloor1, treeTypes[1]]],
		[
			[g_Terrains.forestFloor1, g_Terrains.mainTerrain, treeTypes[0]],
			[g_Terrains.forestFloor2, treeTypes[0]]],
		[
			[g_Terrains.forestFloor1, g_Terrains.mainTerrain, treeTypes[1]],
			[g_Terrains.forestFloor1, treeTypes[1]]
		]
	];

	for (let forestType of forestTypes)
	{
		let offset = getRandomDeviation(size, deviation);
		createAreas(
			new ChainPlacer(1, Math.floor(scaleByMapSize(3, 5) * offset), Math.floor(50 * offset), 0.5),
			[
				new LayeredPainter(forestType, [2]),
				new TileClassPainter(g_TileClasses.forest)
			],
			constraint,
			10 * fill * treeReductionMultiplier);
	}
}

function addMetal(constraint, size, deviation, fill)
{
	return;
}

/**
 * Create stone mines.
 */
function addStone(constraint, size, deviation, fill)
{
	return;
}

/**
 * Create straggler trees.
 */
function addStragglerTrees(constraint, size, deviation, fill)
{
	g_Map.log("Creating straggler trees");

	// Ensure minimum distribution on african biome
	if (currentBiome() == "generic/savanna")
	{
		fill = Math.max(fill, 2);
		size = Math.max(size, 1);
	}

	var trees = [g_Gaia.tree1, g_Gaia.tree2, g_Gaia.tree3, g_Gaia.tree4];

	var treesPerPlayer = 40;
	var playerBonus = Math.max(1, (getNumPlayers() - 3) / 2);

	var offset = getRandomDeviation(size, deviation);
	var treeCount = treesPerPlayer * playerBonus * fill * treeReductionMultiplier;
	var totalTrees = scaleByMapSize(treeCount, treeCount);

	var count = Math.floor(totalTrees / trees.length) * fill;
	var min = offset;
	var max = 4 * offset;
	var minDist = offset;
	var maxDist = 5 * offset;

	// More trees for the african biome
	if (currentBiome() == "generic/savanna")
	{
		min = 3 * offset;
		max = 5 * offset;
		minDist = 2 * offset + 1;
		maxDist = 3 * offset + 2;
	}

	for (var i = 0; i < trees.length; ++i)
	{
		var treesMax = max;

		// Don't clump fruit trees
		if (i == 2 && (currentBiome() == "generic/sahara" || currentBiome() == "generic/aegean"))
			treesMax = 1;

		min = Math.min(min, treesMax);

		var group = new SimpleGroup([new SimpleObject(trees[i], min, treesMax, minDist, maxDist)], true, g_TileClasses.forest);
		createObjectGroupsDeprecated(group, 0, constraint, count);
	}
}
