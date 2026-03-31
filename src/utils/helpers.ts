export const formatPowerLevel = (power: string | number): string => {
	const numPower = typeof power === 'string' ? parseInt(power) : power;

	if (!numPower || isNaN(numPower)) return '0';
	if (numPower >= 1000000000) {
		return `${(numPower / 1000000000).toFixed(1)}B`;
	}
	if (numPower >= 1000000) {
		return `${(numPower / 1000000).toFixed(1)}M`;
	}
	if (numPower >= 1000) {
		return `${(numPower / 1000).toFixed(1)}K`;
	}
	return numPower.toString();
};

export const getAuraColor = (race: string, isDark: boolean = true): string => {
	const auraColors: Record<string, { dark: string; light: string }> = {
		'Saiyan': { dark: '#FF8C00', light: '#FF6B00' },      // Orange
		'Namekian': { dark: '#00FF41', light: '#00CC33' },    // Green
		'Frieza Race': { dark: '#9370DB', light: '#7B68EE' }, // Purple
		'Android': { dark: '#00CED1', light: '#00BFFF' },     // Cyan
		'Majin': { dark: '#FF1493', light: '#FF69B4' },       // Pink
		'Human': { dark: '#4169E1', light: '#1E90FF' },       // Blue
		'God': { dark: '#FFD700', light: '#FFA500' },         // Gold
		'Angel': { dark: '#E0E0E0', light: '#C0C0C0' },       // Silver
	};

	const colors = auraColors[race];
	if (!colors) return isDark ? '#FFFFFF' : '#1A1F3A';

	return isDark ? colors.dark : colors.light;
};

export const getRaceIcon = (race: string): string => {
	const icons: Record<string, string> = {
		'Saiyan': '🔥',
		'Namekian': '🌿',
		'Frieza Race': '❄️',
		'Android': '🤖',
		'Majin': '💫',
		'Human': '👤',
		'God': '✨',
		'Angel': '👼',
		'Jiren Race': '👽',
		'Nucleico benigno': '☄️',
	};

	return icons[race] || '⭐'; // Default star
};

export const getGenderIcon = (gender: string): string => {
	return gender === 'Male' ? '♂️' : gender === 'Female' ? '♀️' : '⚧';
};

export const getAffilationColor = (affiliation: string): string => {
	const colors: Record<string, string> = {
		'Z Fighter': '#34C759',           // Green (heroes)
		'Red Ribbon Army': '#FF3B30',     // Red (villains)
		'Freelancer': '#FF9500',          // Orange (neutral)
		'Army of Frieza': '#9370DB',      // Purple (villains)
		'Pride Troopers': '#00CED1',      // Cyan (heroes)
		'Assistant of Vermoud': '#FFD700', // Gold
		'God': '#FFD700',                 // Gold
		'Assistant of Beerus': '#9370DB', // Purple
		'Villain': '#FF3B30',             // Red
		'Other': '#666666',               // Gray
	};

	return colors[affiliation] || '#666666';
};

export const isValidImageUrl = (url: string): boolean => {
	if (!url) return false;

	try {
		const urlObj = new URL(url);
		return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
	} catch {
		return false;
	}
};

export const truncateText = (text: string, maxLength: number): string => {
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength - 3) + '...';
};