import { useTheme } from "../context/ThemeContext";

export default function Switch() {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={toggleTheme}
            />

            <div className="w-12 h-6 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 peer-checked:from-blue-400 peer-checked:to-indigo-500 transition-all duration-500 after:content-['☀️'] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:flex after:items-center after:justify-center after:transition-all after:duration-500 peer-checked:after:translate-x-6 peer-checked:after:content-['🌙'] after:shadow-md after:text-[9px]" />
        </label>
    );
}