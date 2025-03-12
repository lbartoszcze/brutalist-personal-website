import React from 'react';

// Team member interface
interface TeamMember {
  /**
   * Name of the team member
   */
  name: string;
  /**
   * Role or position
   */
  role: string;
  /**
   * Bio or description
   */
  bio?: string;
  /**
   * Avatar image URL
   */
  avatar?: string;
  /**
   * Social media links
   */
  socials?: {
    /**
     * Platform name (e.g., Twitter, LinkedIn)
     */
    platform: string;
    /**
     * URL to profile
     */
    url: string;
    /**
     * Icon or label for the platform
     */
    icon?: React.ReactNode;
  }[];
}

// Team member card props
interface TeamMemberCardProps {
  /**
   * Team member data
   */
  member: TeamMember;
  /**
   * Card variant
   */
  variant?: 'default' | 'bordered' | 'cutout' | 'minimal';
  /**
   * Size of the card
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Whether to show social links
   */
  showSocials?: boolean;
  /**
   * Layout direction
   */
  layout?: 'vertical' | 'horizontal';
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * A single team member card
 */
export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  variant = 'default',
  size = 'medium',
  showSocials = true,
  layout = 'vertical',
  className = '',
}) => {
  const { name, role, bio, avatar, socials = [] } = member;
  
  // Get container styles based on variant
  const getContainerStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      case 'minimal':
        return 'border border-gray-200';
      default:
        return 'border-2 border-black';
    }
  };
  
  // Get size-based styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return layout === 'vertical' ? 'p-4' : 'p-3';
      case 'large':
        return layout === 'vertical' ? 'p-8' : 'p-6';
      case 'medium':
      default:
        return layout === 'vertical' ? 'p-6' : 'p-4';
    }
  };
  
  // Get avatar size based on card size
  const getAvatarSize = () => {
    switch (size) {
      case 'small':
        return layout === 'vertical' ? 'w-20 h-20' : 'w-16 h-16';
      case 'large':
        return layout === 'vertical' ? 'w-40 h-40' : 'w-24 h-24';
      case 'medium':
      default:
        return layout === 'vertical' ? 'w-32 h-32' : 'w-20 h-20';
    }
  };
  
  // Default avatar placeholder if no image provided
  const defaultAvatar = (
    <div className={`${getAvatarSize()} bg-gray-200 flex items-center justify-center`}>
      <span className="text-gray-500 text-2xl">👤</span>
    </div>
  );
  
  // Render horizontal layout
  if (layout === 'horizontal') {
    return (
      <div className={`
        ${getContainerStyles()}
        ${getSizeStyles()}
        bg-white
        flex items-center
        ${className}
      `}>
        {/* Avatar */}
        <div className="mr-6">
          {avatar ? (
            <img
              src={avatar}
              alt={`${name} avatar`}
              className={`${getAvatarSize()} object-cover border-2 border-black`}
            />
          ) : defaultAvatar}
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-mono font-bold">{name}</h3>
          <p className="text-gray-600 mb-2">{role}</p>
          
          {bio && <p className="mb-4 text-sm">{bio}</p>}
          
          {/* Social links */}
          {showSocials && socials.length > 0 && (
            <div className="flex space-x-3">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label={`${name}'s ${social.platform}`}
                >
                  {social.icon ? (
                    social.icon
                  ) : (
                    <span className="text-sm font-mono border border-black px-2 py-1">
                      {social.platform}
                    </span>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Render vertical layout (default)
  return (
    <div className={`
      ${getContainerStyles()}
      ${getSizeStyles()}
      bg-white
      ${className}
    `}>
      {/* Avatar (centered) */}
      <div className="flex justify-center mb-4">
        {avatar ? (
          <img
            src={avatar}
            alt={`${name} avatar`}
            className={`${getAvatarSize()} object-cover border-2 border-black`}
          />
        ) : defaultAvatar}
      </div>
      
      {/* Content (centered) */}
      <div className="text-center">
        <h3 className="text-xl font-mono font-bold">{name}</h3>
        <p className="text-gray-600 mb-3">{role}</p>
        
        {bio && <p className="mb-4">{bio}</p>}
        
        {/* Social links */}
        {showSocials && socials.length > 0 && (
          <div className="flex justify-center space-x-3 mt-4">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label={`${name}'s ${social.platform}`}
              >
                {social.icon ? (
                  social.icon
                ) : (
                  <span className="text-sm font-mono border border-black px-2 py-1">
                    {social.platform}
                  </span>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Team grid props
interface TeamGridProps {
  /**
   * Array of team members
   */
  members: TeamMember[];
  /**
   * Title for the section
   */
  title?: string;
  /**
   * Subtitle or description
   */
  subtitle?: string;
  /**
   * Number of columns in the grid
   */
  columns?: 2 | 3 | 4;
  /**
   * Card variant
   */
  variant?: 'default' | 'bordered' | 'cutout' | 'minimal';
  /**
   * Size of the cards
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Whether to show social links
   */
  showSocials?: boolean;
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * A grid of team members
 */
export const TeamGrid: React.FC<TeamGridProps> = ({
  members,
  title = 'Our Team',
  subtitle,
  columns = 3,
  variant = 'bordered',
  size = 'medium',
  showSocials = true,
  className = '',
}) => {
  return (
    <div className={`${className}`}>
      {/* Section header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-mono font-bold uppercase mb-4">{title}</h2>
        {subtitle && <p className="text-lg max-w-2xl mx-auto">{subtitle}</p>}
      </div>
      
      {/* Team grid */}
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-8`}>
        {members.map((member, index) => (
          <TeamMemberCard
            key={index}
            member={member}
            variant={variant}
            size={size}
            showSocials={showSocials}
          />
        ))}
      </div>
    </div>
  );
};

// Team list props
interface TeamListProps {
  /**
   * Array of team members
   */
  members: TeamMember[];
  /**
   * Title for the section
   */
  title?: string;
  /**
   * Subtitle or description
   */
  subtitle?: string;
  /**
   * Card variant
   */
  variant?: 'default' | 'bordered' | 'cutout' | 'minimal';
  /**
   * Size of the cards
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Whether to show social links
   */
  showSocials?: boolean;
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * A horizontal list of team members
 */
export const TeamList: React.FC<TeamListProps> = ({
  members,
  title = 'Leadership Team',
  subtitle,
  variant = 'bordered',
  size = 'medium',
  showSocials = true,
  className = '',
}) => {
  return (
    <div className={`${className}`}>
      {/* Section header */}
      <div className="mb-12">
        <h2 className="text-3xl font-mono font-bold uppercase mb-4">{title}</h2>
        {subtitle && <p className="text-lg max-w-2xl">{subtitle}</p>}
      </div>
      
      {/* Team list */}
      <div className="space-y-6">
        {members.map((member, index) => (
          <TeamMemberCard
            key={index}
            member={member}
            variant={variant}
            size={size}
            showSocials={showSocials}
            layout="horizontal"
          />
        ))}
      </div>
    </div>
  );
};

// Team with sections props
interface TeamWithSectionsProps {
  /**
   * Array of team sections
   */
  sections: {
    /**
     * Section title
     */
    title: string;
    /**
     * Section description
     */
    description?: string;
    /**
     * Array of team members in this section
     */
    members: TeamMember[];
  }[];
  /**
   * Main title for the entire team component
   */
  title?: string;
  /**
   * Main subtitle or description
   */
  subtitle?: string;
  /**
   * Number of columns for each section
   */
  columns?: 2 | 3 | 4;
  /**
   * Card variant
   */
  variant?: 'default' | 'bordered' | 'cutout' | 'minimal';
  /**
   * Size of the cards
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Whether to show social links
   */
  showSocials?: boolean;
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * Team display with multiple sections
 */
export const TeamWithSections: React.FC<TeamWithSectionsProps> = ({
  sections,
  title = 'Our Team',
  subtitle,
  columns = 3,
  variant = 'bordered',
  size = 'medium',
  showSocials = true,
  className = '',
}) => {
  return (
    <div className={`${className}`}>
      {/* Main header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-mono font-bold uppercase mb-4">{title}</h2>
        {subtitle && <p className="text-lg max-w-2xl mx-auto">{subtitle}</p>}
      </div>
      
      {/* Sections */}
      <div className="space-y-24">
        {sections.map((section, index) => (
          <div key={index}>
            <div className="mb-12">
              <h3 className="text-2xl font-mono font-bold mb-4">{section.title}</h3>
              {section.description && <p className="text-lg">{section.description}</p>}
            </div>
            
            <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-8`}>
              {section.members.map((member, memberIndex) => (
                <TeamMemberCard
                  key={memberIndex}
                  member={member}
                  variant={variant}
                  size={size}
                  showSocials={showSocials}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example implementation
export const TeamExamples: React.FC = () => {
  // Sample team members
  const teamMembers = [
    {
      name: 'Jane Smith',
      role: 'CEO & Founder',
      bio: 'Has over 15 years of experience in the industry and leads the company vision.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
      socials: [
        { platform: 'Twitter', url: 'https://twitter.com' },
        { platform: 'LinkedIn', url: 'https://linkedin.com' },
      ],
    },
    {
      name: 'Michael Johnson',
      role: 'CTO',
      bio: 'Leads our engineering team and technical strategy with a focus on innovation.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
      socials: [
        { platform: 'GitHub', url: 'https://github.com' },
        { platform: 'LinkedIn', url: 'https://linkedin.com' },
      ],
    },
    {
      name: 'Sarah Williams',
      role: 'Design Director',
      bio: 'Oversees all design aspects, ensuring our products meet the highest standards.',
      avatar: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=300&h=300&fit=crop',
      socials: [
        { platform: 'Dribbble', url: 'https://dribbble.com' },
        { platform: 'Twitter', url: 'https://twitter.com' },
      ],
    },
    {
      name: 'David Chen',
      role: 'Product Manager',
      bio: 'Guides our product strategy and roadmap development.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      socials: [
        { platform: 'LinkedIn', url: 'https://linkedin.com' },
      ],
    },
  ];
  
  // Sample team sections
  const teamSections = [
    {
      title: 'Leadership Team',
      description: 'The visionaries guiding our company',
      members: teamMembers.slice(0, 2),
    },
    {
      title: 'Design Team',
      description: 'The creative minds behind our products',
      members: [teamMembers[2]],
    },
    {
      title: 'Product Team',
      description: 'Building the future of our platform',
      members: [teamMembers[3]],
    },
  ];
  
  // Icons for social media (for example only)
  const socialIconsTeamMember = {
    ...teamMembers[0],
    socials: [
      { platform: 'Twitter', url: 'https://twitter.com', icon: <span>🐦</span> },
      { platform: 'LinkedIn', url: 'https://linkedin.com', icon: <span>🔗</span> },
    ],
  };
  
  return (
    <div className="p-6 space-y-32">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Team Components</h2>
      <p className="mb-8 font-sans">
        Team components with brutalist styling for showcasing your organization's members.
      </p>
      
      {/* Single Team Member Card Examples */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Team Member Card Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-mono font-bold mb-2">Default Variant</h4>
            <TeamMemberCard
              member={teamMembers[0]}
              variant="default"
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Bordered Variant</h4>
            <TeamMemberCard
              member={teamMembers[1]}
              variant="bordered"
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Cutout Variant</h4>
            <TeamMemberCard
              member={teamMembers[2]}
              variant="cutout"
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Minimal Variant</h4>
            <TeamMemberCard
              member={teamMembers[3]}
              variant="minimal"
            />
          </div>
        </div>
      </div>
      
      {/* Team Grid Example */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Team Grid</h3>
        <TeamGrid
          members={teamMembers}
          title="Meet Our Team"
          subtitle="The talented people behind our success"
          variant="bordered"
          columns={4}
        />
      </div>
      
      {/* Team List Example */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Team List</h3>
        <TeamList
          members={teamMembers.slice(0, 3)}
          title="Our Leadership"
          subtitle="Meet the people driving our vision forward"
          variant="bordered"
        />
      </div>
      
      {/* Team With Sections Example */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Team With Sections</h3>
        <TeamWithSections
          sections={teamSections}
          title="Our Organization"
          subtitle="Meet the dedicated teams behind our company"
          variant="bordered"
          columns={3}
        />
      </div>
      
      {/* Team Member Card Sizes */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Team Member Card Sizes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-mono font-bold mb-2">Small Size</h4>
            <TeamMemberCard
              member={socialIconsTeamMember}
              variant="bordered"
              size="small"
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Medium Size</h4>
            <TeamMemberCard
              member={socialIconsTeamMember}
              variant="bordered"
              size="medium"
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Large Size</h4>
            <TeamMemberCard
              member={socialIconsTeamMember}
              variant="bordered"
              size="large"
            />
          </div>
        </div>
      </div>
      
      {/* Horizontal Layout Examples */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Horizontal Layout Cards</h3>
        <div className="space-y-8">
          <TeamMemberCard
            member={teamMembers[0]}
            variant="bordered"
            layout="horizontal"
          />
          
          <TeamMemberCard
            member={teamMembers[1]}
            variant="cutout"
            layout="horizontal"
          />
        </div>
      </div>
    </div>
  );
}; 