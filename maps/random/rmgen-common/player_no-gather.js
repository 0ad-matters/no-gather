/**
 * @file These functions locate and place the starting entities of players.
 */

/**
 * These are identifiers of functions that can generate parts of a player base.
 * There must be a function starting with placePlayerBase and ending with this name.
 * This is a global so mods can extend this from external files.
 */
var g_PlayerBaseFunctions = [
	// Possibly mark player class first here and use it afterwards
	"CityPatch",
	// Create the largest and most important entities first
	"Treasures",
	"Decoratives"
];

/**
 * Places the given entities at the given location (typically a civic center and starting units).
 * @param location - A Vector2D specifying tile coordinates.
 * @param civEntities - An array of objects with the Template property and optionally a Count property.
 * The first entity is placed in the center, the other ones surround it.
 */
function placeStartingEntities(location, playerID, civEntities, dist = 6, orientation = BUILDING_ORIENTATION)
{
	// Place the central structure
	let i = 0;
	let firstTemplate = civEntities[i].Template;
	if (firstTemplate.startsWith("structures/"))
	{
		g_Map.placeEntityPassable(firstTemplate, playerID, location, orientation);
		++i;
	}

	// Place entities surrounding it
	let space = 2;
	for (let j = i; j < civEntities.length; ++j)
	{
		let angle = orientation - Math.PI * (1 - j / 2);
		let count = civEntities[j].Count || 1;
		// no-gather mod
		if (count == 2)
			count *= 12 // multiply only the 2 ranged and 2 non-ranged infantry
		//

		for (let num = 0; num < count; ++num)
		{
			let position = Vector2D.sum([
				location,
				new Vector2D(dist, 0).rotate(-angle),
				new Vector2D(space * (-num + (count - 1) / 2), 0).rotate(angle)
			]);

			g_Map.placeEntityPassable(civEntities[j].Template, playerID, position, angle);
		}
	}
}
