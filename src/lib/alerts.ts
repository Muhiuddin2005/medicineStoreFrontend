import Swal from "sweetalert2";

export const deleteAlertOptions = (title: string, text: string, confirmText = "Yes, Delete") => ({
  title,
  text,
  icon: "warning" as const,
  showCancelButton: true,
  confirmButtonText: confirmText,
  cancelButtonText: "Cancel",
  customClass: {
    popup: "rounded-2xl border border-border bg-gradient-to-br from-card to-muted p-6 shadow-2xl select-none",
    title: "text-2xl font-extrabold text-foreground tracking-tight",
    htmlContainer: "text-muted-foreground text-sm font-medium mt-2",
    confirmButton: "bg-destructive text-white hover:bg-destructive/90 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2 m-2 cursor-pointer",
    cancelButton: "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 m-2 cursor-pointer"
  },
  buttonsStyling: false
});

export const confirmAlertOptions = (title: string, text: string, confirmButtonText = "Confirm", isDestructive = false) => ({
  title,
  text,
  icon: isDestructive ? ("warning" as const) : ("question" as const),
  showCancelButton: true,
  confirmButtonText,
  cancelButtonText: "Cancel",
  customClass: {
    popup: "rounded-2xl border border-border bg-gradient-to-br from-card to-muted p-6 shadow-2xl select-none",
    title: "text-2xl font-extrabold text-foreground tracking-tight",
    htmlContainer: "text-muted-foreground text-sm font-medium mt-2",
    confirmButton: isDestructive
      ? "bg-destructive text-white hover:bg-destructive/90 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2 m-2 cursor-pointer"
      : "bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 m-2 cursor-pointer",
    cancelButton: "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 m-2 cursor-pointer"
  },
  buttonsStyling: false
});
