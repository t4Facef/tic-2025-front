export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue3"></div>
            <p className="mt-4 text-gray-600">Carregando vagas...</p>
        </div>
    )
}