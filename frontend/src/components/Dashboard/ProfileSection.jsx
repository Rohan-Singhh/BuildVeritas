import { Edit3, MapPin, Mail, Phone, User, Building2 } from "lucide-react";

export const ProfileSection = () => {
  const profileData = {
    name: "John Anderson",
    email: "john.anderson@email.com",
    phone: "+91 98765 43210",
    address: "Sector 45, Gurgaon, Haryana 122003",
    activeProjects: 1,
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  };

  return (
    <div className="rounded-lg border-0 bg-card text-card-foreground shadow-elegant hover:shadow-glow animate-fade-in-up bg-gradient-to-br from-background via-background to-muted/10">
      <div className="relative bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-b border-border/20 flex flex-col space-y-1.5 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="relative flex h-24 w-24 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-elegant">
                <img
                  src={profileData.profileImage}
                  alt={profileData.name}
                  className="aspect-square h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground animate-fade-in">
                {profileData.name}
              </h1>

              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-primary/10 text-primary border-primary/20 animate-pulse-subtle">
                  <Building2 className="h-3 w-3 mr-1" />
                  {profileData.activeProjects} Active Projects
                </span>
              </div>
            </div>
          </div>

          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 group transition-transform duration-200 hover:scale-105">
            <Edit3 className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="p-8 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              Contact Information
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Address
                </label>
                <p className="text-foreground font-medium p-3 bg-muted/30 rounded-lg border border-border/20">
                  {profileData.email}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <Phone className="h-4 w-4 mr-2" />
                  Phone Number
                </label>
                <p className="text-foreground font-medium p-3 bg-muted/30 rounded-lg border border-border/20">
                  {profileData.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Address & Projects */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              Location & Projects
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Address
                </label>
                <p className="text-foreground font-medium p-3 bg-muted/30 rounded-lg border border-border/20">
                  {profileData.address}
                </p>
              </div>

              <div className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Active Projects
                    </p>
                    <p className="text-3xl font-bold text-primary animate-number-glow">
                      {profileData.activeProjects}
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Actions */}
        {/* <div className="mt-8 pt-6 border-t border-border/20">
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 transition-transform duration-200 hover:scale-105">
              View All Projects
            </button>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 transition-transform duration-200 hover:scale-105">
              Download Profile
            </button>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 transition-transform duration-200 hover:scale-105">
              Privacy Settings
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};
