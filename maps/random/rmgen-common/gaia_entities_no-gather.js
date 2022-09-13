var treeReductionMultiplier = 0.3

/**
 * @file These functions are often used to place gaia entities, like forests, mines, animals or decorative bushes.
 */

/**
 * Returns the number of trees in forests and straggler trees.
 */
function getTreeCounts(minTrees, maxTrees, forestRatio)
{
	return [forestRatio, 1 - forestRatio].map(p => p * scaleByMapSize(minTrees * treeReductionMultiplier, maxTrees * treeReductionMultiplier));
}

function createStragglerTrees(templateNames, constraint, tileClass, treeCount, retryFactor)
{
	g_Map.log("Creating straggler trees");
	for (let templateName of templateNames)
		createObjectGroupsDeprecated(
			new SimpleGroup([new SimpleObject(templateName, 1, 1, 0, 3)], true, tileClass),
			0,
			constraint,
			Math.floor(treeCount * treeReductionMultiplier / templateNames.length),
			retryFactor);
}

function createMines(objects, constraint, tileClass, count)
{
	return;
}

function createBalancedMines(oSmall, oLarge, clMine, constraints, counts, randomness)
{
	return;
}

function createBalancedMetalMines(oSmall, oLarge, clMine, constraints, counts = 1.0, randomness = 0.05)
{
	return;
}

function createBalancedStoneMines(oSmall, oLarge, clMine, constraints, counts = 1.0, randomness = 0.05)
{
	return;
}

function createStoneMineFormation(position, templateName, terrain, radius = 2.5, count = 8, startAngle = undefined, maxOffset = 1)
{
	return;
}

function createFood(objects, counts, constraint, tileClass)
{
	return;
}
