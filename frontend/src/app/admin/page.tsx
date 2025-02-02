// app/dashboard/page.tsx
export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Selamat Datang di Dashboard</h1>
            <div className="flex w-full flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        </div>
    );
}
