/* ============================================
   Wheel Templates Data
   ============================================ */

const WHEEL_TEMPLATES = [
    {
        id: 'classroom',
        name: 'Classroom Picker',
        desc: 'Random student names',
        icon: '🎓',
        color: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
        theme: 'rainbow',
        centerTitle: 'PICK',
        entries: [
            { text: 'Alice', color: '#8b5cf6' },
            { text: 'Ben', color: '#ec4899' },
            { text: 'Chloe', color: '#fbbf24' },
            { text: 'David', color: '#3b82f6' },
            { text: 'Emma', color: '#10b981' },
            { text: 'Felix', color: '#f97316' },
            { text: 'Grace', color: '#06b6d4' },
            { text: 'Henry', color: '#a855f7' }
        ]
    },
    {
        id: 'giveaway',
        name: 'Giveaway Wheel',
        desc: 'Prize draw for events',
        icon: '🎁',
        color: 'linear-gradient(135deg, #ec4899, #f43f5e)',
        theme: 'candy',
        centerTitle: 'WIN!',
        entries: [
            { text: '🎁 $100', color: '#ec4899' },
            { text: 'Free T-Shirt', color: '#fbbf24' },
            { text: '🎁 $50', color: '#8b5cf6' },
            { text: 'Mug', color: '#3b82f6' },
            { text: '🎁 $200', color: '#10b981' },
            { text: 'Sticker Pack', color: '#f97316' },
            { text: '🎁 $25', color: '#06b6d4' },
            { text: 'Free Spin', color: '#a855f7' }
        ]
    },
    {
        id: 'lunch',
        name: 'Lunch Picker',
        desc: 'Where to eat today',
        icon: '🍕',
        color: 'linear-gradient(135deg, #fbbf24, #f97316)',
        theme: 'sunset',
        centerTitle: 'EAT',
        entries: [
            { text: '🍕 Pizza', color: '#fbbf24' },
            { text: '🍔 Burger', color: '#f97316' },
            { text: '🍜 Ramen', color: '#ef4444' },
            { text: '🥗 Salad', color: '#10b981' },
            { text: '🍣 Sushi', color: '#ec4899' },
            { text: '🌮 Tacos', color: '#fb923c' },
            { text: '🍝 Pasta', color: '#8b5cf6' },
            { text: '🥙 Wrap', color: '#3b82f6' }
        ]
    },
    {
        id: 'movie',
        name: 'Movie Night',
        desc: 'What to watch tonight',
        icon: '🎬',
        color: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
        theme: 'ocean',
        centerTitle: 'WATCH',
        entries: [
            { text: 'Action', color: '#3b82f6' },
            { text: 'Comedy', color: '#fbbf24' },
            { text: 'Horror', color: '#1f2937' },
            { text: 'Romance', color: '#ec4899' },
            { text: 'Sci-Fi', color: '#06b6d4' },
            { text: 'Documentary', color: '#10b981' },
            { text: 'Animation', color: '#f97316' },
            { text: 'Thriller', color: '#a855f7' }
        ]
    },
    {
        id: 'truth-dare',
        name: 'Truth or Dare',
        desc: 'Party game wheel',
        icon: '🎉',
        color: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
        theme: 'candy',
        centerTitle: 'SPIN!',
        entries: [
            { text: 'Truth', color: '#3b82f6' },
            { text: 'Dare', color: '#ec4899' },
            { text: 'Truth', color: '#10b981' },
            { text: 'Dare', color: '#fbbf24' },
            { text: 'Truth', color: '#8b5cf6' },
            { text: 'Dare', color: '#f97316' }
        ]
    },
    {
        id: 'chores',
        name: 'Chore Wheel',
        desc: 'Fair chore assigner',
        icon: '🧹',
        color: 'linear-gradient(135deg, #10b981, #06b6d4)',
        theme: 'forest',
        centerTitle: 'CHORE',
        entries: [
            { text: 'Dishes', color: '#10b981' },
            { text: 'Vacuum', color: '#3b82f6' },
            { text: 'Trash', color: '#f97316' },
            { text: 'Laundry', color: '#8b5cf6' },
            { text: 'Bathroom', color: '#ec4899' },
            { text: 'Cook', color: '#fbbf24' }
        ]
    },
    {
        id: 'yes-no',
        name: 'Yes or No',
        desc: 'Quick decision maker',
        icon: '✅',
        color: 'linear-gradient(135deg, #10b981, #3b82f6)',
        theme: 'ocean',
        centerTitle: '?',
        entries: [
            { text: 'YES', color: '#10b981' },
            { text: 'NO', color: '#ef4444' },
            { text: 'YES', color: '#3b82f6' },
            { text: 'NO', color: '#f97316' }
        ]
    },
    {
        id: 'numbers',
        name: 'Number Wheel',
        desc: 'Random number picker',
        icon: '🔢',
        color: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        theme: 'neon',
        centerTitle: 'NUM',
        entries: [
            { text: '1', color: '#8b5cf6' },
            { text: '2', color: '#ec4899' },
            { text: '3', color: '#fbbf24' },
            { text: '4', color: '#3b82f6' },
            { text: '5', color: '#10b981' },
            { text: '6', color: '#f97316' },
            { text: '7', color: '#06b6d4' },
            { text: '8', color: '#a855f7' }
        ]
    },
    {
        id: 'colors',
        name: 'Color Picker',
        desc: 'Pick a random color',
        icon: '🎨',
        color: 'linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcf7f, #4d9fff, #b66bff)',
        theme: 'rainbow',
        centerTitle: 'COLOR',
        entries: [
            { text: 'Red', color: '#ef4444' },
            { text: 'Orange', color: '#f97316' },
            { text: 'Yellow', color: '#fbbf24' },
            { text: 'Green', color: '#10b981' },
            { text: 'Blue', color: '#3b82f6' },
            { text: 'Purple', color: '#8b5cf6' },
            { text: 'Pink', color: '#ec4899' },
            { text: 'Cyan', color: '#06b6d4' }
        ]
    },
    {
        id: 'workout',
        name: 'Workout Picker',
        desc: 'Random exercise',
        icon: '💪',
        color: 'linear-gradient(135deg, #ef4444, #f97316)',
        theme: 'fire',
        centerTitle: 'TRAIN',
        entries: [
            { text: 'Push-ups', color: '#ef4444' },
            { text: 'Squats', color: '#f97316' },
            { text: 'Plank', color: '#fbbf24' },
            { text: 'Burpees', color: '#ec4899' },
            { text: 'Lunges', color: '#8b5cf6' },
            { text: 'Sit-ups', color: '#3b82f6' }
        ]
    },
    {
        id: 'game',
        name: 'Game Night',
        desc: 'Pick a game to play',
        icon: '🎲',
        color: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
        theme: 'neon',
        centerTitle: 'PLAY',
        entries: [
            { text: 'Chess', color: '#1f2937' },
            { text: 'Uno', color: '#ef4444' },
            { text: 'Monopoly', color: '#10b981' },
            { text: 'Poker', color: '#8b5cf6' },
            { text: 'Scrabble', color: '#fbbf24' },
            { text: 'Risk', color: '#f97316' }
        ]
    },
    {
        id: 'icebreaker',
        name: 'Icebreaker',
        desc: 'Get-to-know questions',
        icon: '💬',
        color: 'linear-gradient(135deg, #fbbf24, #ec4899)',
        theme: 'pastel',
        centerTitle: 'ASK',
        entries: [
            { text: 'Favorite hobby?', color: '#fbbf24' },
            { text: 'Dream travel?', color: '#ec4899' },
            { text: 'Hidden talent?', color: '#3b82f6' },
            { text: 'Best memory?', color: '#10b981' },
            { text: 'Fun fact?', color: '#f97316' },
            { text: 'Pet peeve?', color: '#8b5cf6' }
        ]
    }
];

const COLOR_THEMES = {
    rainbow: ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d9fff', '#b66bff', '#ff6bb5', '#ffa45c', '#3ad6c7'],
    sunset: ['#ff6b6b', '#ff8c42', '#ffd93d', '#ffa45c', '#ff5e8a', '#ffb84d', '#ff7e5f', '#ffc04d'],
    ocean: ['#4d9fff', '#6bcf7f', '#4dd0e1', '#5eead4', '#3b82f6', '#10b981', '#06b6d4', '#2dd4bf'],
    candy: ['#ff6bb5', '#b66bff', '#6bcfff', '#ff8ed4', '#c084fc', '#f0abfc', '#67e8f9', '#7dd3fc'],
    forest: ['#2d6a4f', '#6bcf7f', '#95d5b2', '#52b788', '#74c69d', '#40916c', '#1b4332', '#b7e4c7'],
    neon: ['#ff006e', '#8338ec', '#3a86ff', '#06ffa5', '#ffbe0b', '#fb5607', '#ff4081', '#00bbf9'],
    pastel: ['#ffd6e0', '#c7ceea', '#b5ead7', '#ffdac1', '#e2c2ff', '#c1f0ff', '#ffe5b4', '#d4f4dd'],
    fire: ['#ff0844', '#ffb199', '#ff6b35', '#ff0844', '#ff8c42', '#ff4500', '#ff6347', '#ff7f50']
};
