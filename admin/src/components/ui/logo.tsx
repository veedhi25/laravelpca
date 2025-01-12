import Image from "next/image";
import Link from "@components/ui/link";
import cn from "classnames";
import { siteSettings } from "@settings/site.settings";
import { useSettings } from "@contexts/settings.context";

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  const { logo, siteTitle } = useSettings();

  return (

      <Link
        href={siteSettings.logo.href}
        className={cn("inline-flex", className)}
        {...props}
      >
        <span
          className="overflow-hidden relative"
          style={{
            width: siteSettings.logo.width,
            height: siteSettings.logo.height,
          }}
        >
          <img src='/boy.png' alt='PCA Logo' className=' object-contain h-full w-full  rounded-lg' />
        {/* <Image quality='40'
          src={logo?.thumbnail ?? siteSettings.logo.placeholderImage}
          alt={siteTitle ?? siteSettings.logo.alt}
          layout="fill"
          objectFit="contain"
          loading="eager"
        /> */}
          
        </span>
      </Link>

  );
};

export default Logo;
