import SettingsComponent from "./Settingspage/page";
import HomePage from "./HomePage/page";

export default function Home() {
    return (
        <div className="p-4">
            <SettingsComponent />
            <HomePage />
        </div>
    );
}
